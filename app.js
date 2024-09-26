const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2'); // For MySQL connection

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Use EJS as the template engine
app.use(express.static('public')); // Serve static files from the public folder

// MySQL database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotifyact'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// File upload configuration using Multer for both MP3 and album cover
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Upload files to 'public/uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
});
const upload = multer({ storage: storage });

// Route to display homepage with uploaded songs
app.get('/', (req, res) => {
    getUploadedSongs((songs) => {
        res.render('index', { songs }); // Render the index.ejs file with songs data
    });
});

// About page route
app.get('/about', (req, res) => {
    res.render('about'); // Render the about.ejs page
});

// Handle MP3 and album cover uploads
app.post('/upload', upload.fields([{ name: 'mp3file', maxCount: 1 }, { name: 'albumCover', maxCount: 1 }]), (req, res) => {
    const uploaderName = req.body.uploaderName; // Get the uploader's name
    const mp3File = req.files['mp3file'][0];
    const albumCover = req.files['albumCover'] ? req.files['albumCover'][0] : null;

    const filename = mp3File.filename;
    const filepath = `/uploads/${filename}`;
    const albumCoverPath = albumCover ? `/uploads/${albumCover.filename}` : null;

    // Save file information to the database
    const query = 'INSERT INTO song (filename, filepath, album_cover, uploader_name) VALUES (?, ?, ?, ?)';
    db.query(query, [filename, filepath, albumCoverPath, uploaderName], (err, result) => {
        if (err) {
            console.error(`Failed to insert into database: ${err}`);
            return res.status(500).send('Database error');
        }
        console.log('File information saved to database');
        res.redirect('/');
    });
});

// Handle song deletion
app.post('/delete', (req, res) => {
    const songId = req.body.song_id;

    // Find the file path in the database
    const query = 'SELECT filepath, album_cover FROM song WHERE id = ?';
    db.query(query, [songId], (err, results) => {
        if (err || results.length === 0) {
            console.error(`Song not found: ${err}`);
            return res.status(404).send('Song not found');
        }

        const filepath = path.join(__dirname, 'public', results[0].filepath);
        const albumCoverPath = results[0].album_cover ? path.join(__dirname, 'public', results[0].album_cover) : null;

        // Delete the MP3 file and album cover from the filesystem
        fs.unlink(filepath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${err}`);
                return res.status(500).send('File deletion error');
            }

            if (albumCoverPath) {
                fs.unlink(albumCoverPath, (err) => {
                    if (err) {
                        console.error(`Failed to delete album cover: ${err}`);
                    }
                });
            }

            // Remove the song record from the database
            const deleteQuery = 'DELETE FROM song WHERE id = ?';
            db.query(deleteQuery, [songId], (err) => {
                if (err) {
                    console.error(`Failed to delete from database: ${err}`);
                    return res.status(500).send('Database deletion error');
                }
                console.log('File and database entry deleted successfully.');
                res.redirect('/');
            });
        });
    });
});

// Function to retrieve songs from the database
function getUploadedSongs(callback) {
    const query = 'SELECT * FROM song ORDER BY uploaded_at DESC';
    db.query(query, (err, results) => {
        if (err) throw err;
        callback(results);
    });
}

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
