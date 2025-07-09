-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 10.0.40.17:3307
-- Generation Time: Jul 08, 2025 at 01:15 PM
-- Server version: 11.7.2-MariaDB
-- PHP Version: 8.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healandmir`
--

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE `zones` (
  `zoneId` int(11) NOT NULL,
  `regionId` int(4) DEFAULT NULL,
  `zone` varchar(200) DEFAULT NULL,
  `ref` varchar(11) DEFAULT NULL,
  `mag_ref` varchar(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0,
  `familyId` int(11) NOT NULL,
  `sub_familyId` int(11) NOT NULL DEFAULT 0,
  `sub_zoneId` int(11) NOT NULL DEFAULT 0,
  `cell_id` int(11) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 1,
  `item` int(11) NOT NULL DEFAULT 0,
  `checked` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`zoneId`, `regionId`, `zone`, `ref`, `mag_ref`, `status`, `familyId`, `sub_familyId`, `sub_zoneId`, `cell_id`, `type`, `item`, `checked`) VALUES
(1, 1, 'Australia Region', 'AUS', 'CEAUS', 1, 0, 0, 0, 0, 1, 0, 0),
(2, 2, 'BLW KENYA ZONE', 'LWKZ', 'LWKZ', 0, 0, 0, 0, 0, 3, 0, 0),
(3, 2, 'BLW SOUTH AFRICA ZONE D', 'LWSAZD', 'LWSAZD', 0, 0, 0, 0, 0, 3, 0, 0),
(4, 2, 'BLW GHANA ZONE A', 'LWGZA', 'LWCMGZNA', 0, 0, 0, 0, 0, 3, 0, 0),
(5, 2, 'BLW GHANA ZONE B', 'LWGZB', 'LWCMGZNB', 0, 0, 0, 0, 0, 3, 0, 0),
(6, 2, 'BLW SOUTH AFRICA ZONE A', 'LWSAZA', 'LWSAZA', 0, 0, 0, 0, 0, 3, 0, 0),
(7, 2, 'BLW UK ZONE A', 'LWUKA', 'LWUKA', 0, 0, 0, 0, 0, 3, 0, 0),
(8, 2, 'BLW UK ZONE B', 'LWUKB', 'LWUKB', 0, 0, 0, 0, 0, 3, 0, 0),
(9, 2, 'BLW SOUTH AFRICA ZONE B', 'LWSAZB', 'LWSAZB', 0, 0, 0, 0, 0, 3, 0, 0),
(10, 2, 'BLW SOUTH AFRICA ZONE C', 'LWSAZC', 'LWSAZC', 0, 0, 0, 0, 0, 3, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`zoneId`),
  ADD KEY `ref` (`ref`),
  ADD KEY `familyId` (`familyId`),
  ADD KEY `type` (`type`),
  ADD KEY `item` (`item`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
