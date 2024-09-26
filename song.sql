-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 26, 2024 at 11:13 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spotifyact`
--

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
CREATE TABLE IF NOT EXISTS `song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `filepath` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `album_cover` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uploader_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`id`, `filename`, `filepath`, `album_cover`, `uploaded_at`, `uploader_name`) VALUES
(1, '1727327938496.mp3', '/uploads/1727327938496.mp3', '/uploads/1727327938708.webp', '2024-09-26 05:18:58', 'We can\'t be Friends'),
(2, '1727329429265.mp3', '/uploads/1727329429265.mp3', '/uploads/1727329429568.webp', '2024-09-26 05:43:49', 'Back to December'),
(3, '1727329676743.mp3', '/uploads/1727329676743.mp3', '/uploads/1727329677039.webp', '2024-09-26 05:47:57', 'Daylight'),
(4, '1727329706021.mp3', '/uploads/1727329706021.mp3', '/uploads/1727329706534.webp', '2024-09-26 05:48:26', 'Enchanted');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
