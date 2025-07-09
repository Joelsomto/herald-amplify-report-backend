-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 10.0.40.17:3307
-- Generation Time: Jul 08, 2025 at 01:14 PM
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
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `subscriberId` int(11) NOT NULL,
  `title` varchar(30) NOT NULL DEFAULT '-',
  `firstname` varchar(35) DEFAULT NULL,
  `lastname` varchar(35) DEFAULT NULL,
  `email` varchar(45) NOT NULL DEFAULT '-',
  `phone` varchar(20) DEFAULT '-',
  `kc_phone` varchar(30) NOT NULL DEFAULT '-',
  `kc_confirmed` int(11) NOT NULL DEFAULT 0,
  `country` varchar(150) DEFAULT '''-''',
  `ip_address` varchar(25) NOT NULL DEFAULT '-',
  `state` varchar(120) NOT NULL DEFAULT '''-''',
  `city` varchar(50) NOT NULL DEFAULT '-',
  `language` varchar(60) NOT NULL DEFAULT '-',
  `birthday` date DEFAULT NULL,
  `participants` int(11) NOT NULL DEFAULT 1,
  `crypt_val` varchar(80) DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `zoneId` int(11) NOT NULL DEFAULT 98,
  `groupId` int(11) NOT NULL DEFAULT 0,
  `churchId` int(11) NOT NULL DEFAULT 0,
  `sub_zoneId` int(11) NOT NULL DEFAULT 0,
  `cell_id` int(11) NOT NULL DEFAULT 0,
  `familyId` int(11) NOT NULL DEFAULT 98,
  `zoneId_net` int(11) NOT NULL DEFAULT 0,
  `familyId_net` int(11) NOT NULL DEFAULT 0,
  `ministry_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `department` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `deptId` int(11) NOT NULL DEFAULT 0,
  `vc_refId` int(11) NOT NULL DEFAULT 0,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `confirmed` int(1) NOT NULL DEFAULT 0,
  `valid_email` int(11) NOT NULL DEFAULT 0,
  `dispatch` int(1) NOT NULL DEFAULT 0,
  `seen` int(11) NOT NULL DEFAULT 0,
  `presubscribed` int(1) NOT NULL DEFAULT 0,
  `gmfs_reg` varchar(20) NOT NULL DEFAULT '-',
  `previous_student` varchar(15) DEFAULT '-',
  `financial_partner` int(11) NOT NULL DEFAULT 0,
  `partner` int(11) NOT NULL DEFAULT 0,
  `donation_categories` varchar(250) NOT NULL DEFAULT '-',
  `partner_regdate` timestamp NOT NULL DEFAULT current_timestamp(),
  `translator` int(11) NOT NULL DEFAULT 0,
  `httnlive` varchar(8) NOT NULL DEFAULT '-',
  `exhibition` varchar(7) NOT NULL DEFAULT '-',
  `hsopc` varchar(20) NOT NULL DEFAULT '-',
  `hsopc_moved` int(11) NOT NULL DEFAULT 0,
  `hslhs` varchar(8) NOT NULL DEFAULT '-',
  `gdop` varchar(10) NOT NULL DEFAULT '-',
  `ylw` varchar(15) NOT NULL DEFAULT '-',
  `herald` int(11) NOT NULL DEFAULT 0,
  `httn_app` int(11) NOT NULL DEFAULT 0,
  `herald_app_status` int(11) NOT NULL DEFAULT 0,
  `profile_picture` varchar(80) NOT NULL DEFAULT '-',
  `view_lang` varchar(50) NOT NULL DEFAULT '-',
  `db_move` int(11) NOT NULL DEFAULT 0,
  `unsubscribe` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`subscriberId`, `title`, `firstname`, `lastname`, `email`, `phone`, `kc_phone`, `kc_confirmed`, `country`, `ip_address`, `state`, `city`, `language`, `birthday`, `participants`, `crypt_val`, `password`, `zoneId`, `groupId`, `churchId`, `sub_zoneId`, `cell_id`, `familyId`, `zoneId_net`, `familyId_net`, `ministry_name`, `department`, `deptId`, `vc_refId`, `login_time`, `timestamp`, `confirmed`, `valid_email`, `dispatch`, `seen`, `presubscribed`, `gmfs_reg`, `previous_student`, `financial_partner`, `partner`, `donation_categories`, `partner_regdate`, `translator`, `httnlive`, `exhibition`, `hsopc`, `hsopc_moved`, `hslhs`, `gdop`, `ylw`, `herald`, `httn_app`, `herald_app_status`, `profile_picture`, `view_lang`, `db_move`, `unsubscribe`) VALUES
(52, '-', '', '', 'c2behiri@gmail.com', '', '', 1, '-', '72.69.207.4', '-', '-', 'English', NULL, 1, '$1$$bxAPdUu5s6tpbMmcFdnhf1', '0', 29611, 0, 0, 0, 0, 29611, 0, 0, '-', '-', 0, 766371, '2025-07-07 20:52:16', '2023-10-29 15:45:23', 1, 1, 0, 0, 1, 'GMFSMay21', 'GMFS', 11, 0, '-', '2022-05-13 11:01:35', 0, '0', '-', '-', 1, 'Oct23', 'Dec21', '-', 1, 0, 0, '-', 'English', 0, 0),
(57, '-', 'Bro Michael', NULL, 'michael@gmail.com', '08133793219', '-', 0, 'Nigeria', '102.88.33.12', 'Edo', 'Benin City', 'English', NULL, 1, '$1$$yuJvrYXXGQuBwrXyfMcoL/', 'Michael1', 1322, 0, 0, 0, 0, 29, 0, 0, '-', '-', 0, 3224462, '2025-02-28 15:12:14', '2024-07-26 10:10:09', 1, 1, 0, 1, 1, 'Apr22', '-', 0, 0, '-', '2022-05-13 11:01:35', 0, 'Jan23', '-', 'Oct21', 0, 'Mar25', '-', '-', 1, 0, 0, '-', 'English', 5, 1),
(70, '-', 'Connie', 'Ontefetse ', 'connieontie@gmail.com', '00267 74120526', '-', 0, 'Botswana', '-', 'Gaborone', 'Gaborone', 'English', NULL, 1, '$1$$mkEwTcrth0RpLxQsCFvy2.', 'Newcreation@01', 8278, 0, 0, 0, 0, 8278, 0, 0, '-', '-', 0, 637354, '2025-03-11 14:07:44', '2023-07-27 18:07:14', 1, 1, 0, 0, 1, 'GMFSMay21', 'HSLHS', 0, 0, '-', '2022-05-13 11:01:35', 0, 'Jan22', '-', 'Feb22', 1, 'Jul23', '-', '-', 1, 0, 0, '-', '-', 5, 0),
(89, '-', 'Oby', 'GREENE', 'obyniky@yahoo.com', '-', '-', 0, 'United States', '-', 'Texas', 'Cypress', 'English', NULL, 1, '$1$$svoM1KOYqXvKHK5efKCyQ1', 'Lipitor@25', 48, 0, 0, 0, 0, 48, 0, 0, '-', '-', 0, 0, '2025-06-22 22:14:32', '2023-10-20 07:09:36', 1, 1, 0, 1, 1, '-', '-', 0, 0, '-', '2022-05-13 11:01:35', 0, '0', '-', '-', 0, 'Jul23', '-', '-', 1, 0, 0, '-', '-', 5, 0),
(94, '-', 'Sis Pauline', 'Ugwu', 'paulineutomi2015.pu@gmail.com', '08029415242', '-', 0, 'Nigeria', '105.113.85.160', 'Lagos', 'Ijedodo Olori Ebi', 'English', '1970-01-01', 1, '$1$$nDYqpTah4AO6FSsoL5woP1', 'ceoloriebi', 37, 0, 0, 0, 0, 37, 0, 0, '-', '-', 0, 493502, '2024-10-26 15:47:14', '2024-07-25 10:02:49', 1, 1, 0, 1, 1, 'Aug22', 'HSLHS', 0, 1, 'Healing Everywhere', '2024-02-21 13:36:36', 0, '0', '-', '-', 0, 'Oct24', '-', '-', 1, 0, 0, '-', '-', 5, 1),
(98, '-', 'Caritas CHIURA', 'Chiura', 'caritaschiura@gmail.com', '-', '', 1, 'Zimbabwe', '-', 'Harare', 'Harare', 'English', '1970-01-01', 1, '$1$$Ut1/hxMwF1UBxXNCB5X2q1', 'tinomutenda@3', 47, 0, 0, 0, 0, 47, 0, 0, '-', '-', 0, 405973, '2025-07-06 18:29:51', '2023-09-23 17:17:20', 1, 1, 0, 0, 1, 'Aug22', '-', 0, 1, 'Healing Everywhere', '2023-09-02 14:45:43', 0, 'May22', '-', '-', 1, 'Jul23', '-', '-', 1, 0, 0, '-', 'English', 5, 0),
(102, '-', 'Sister Regina', 'Ichie', 'regina4life18@yahoo.com', '08029893922', '-', 0, 'Nigeria', '-', 'Lagos', 'Surulere', 'English', NULL, 1, '$1$$nkA97nNZ4merVE7SgZ0Nl0', 'queenSharon1#', 157, 0, 0, 0, 0, 38, 0, 0, '-', '-', 0, 388003, '2024-10-27 09:45:15', '2023-10-14 18:45:47', 1, 1, 1, 1, 1, '-', '-', 0, 0, '-', '2022-05-13 11:01:35', 0, '0', '-', 'Oct21', 0, 'Oct24', '-', '-', 1, 0, 0, '-', 'English', 5, 0),
(125, '-', 'Samantha Moyo', 'Ndlovu', 'sammamoyo75@gmail.com', '+27621173961', '-', 0, 'South Africa', '-', 'Gauteng', 'Kempton park', 'English', NULL, 1, '$1$$WTlzbmFm7D4nFuKxFpsyG1', 'sammy@2025', 25631, 0, 0, 0, 0, 46, 0, 0, '-', '-', 0, 36855, '2025-06-24 15:32:50', '2023-06-05 10:18:19', 1, 1, 0, 1, 1, '-', '-', 0, 0, '-', '2022-05-13 11:01:35', 0, '0', '-', '-', 0, 'Mar22', '-', '-', 1, 0, 0, '-', 'English', 5, 0),
(173, 'Sister', 'Khanyiso', 'Mkharo', 'divinekhanyiso@gmail.com', '264', '-', 0, 'Namibia', '-', 'Khomas Region', 'Windhoek', 'English', '1970-01-01', 1, '$1$$mAot3qHy3CBfmS9vbsCw./', 'myhelper', 83, 0, 0, 0, 0, 83, 0, 0, '', '-', 0, 500666, '2025-06-20 10:13:22', '2024-06-13 14:42:12', 1, 1, 0, 1, 1, 'Apr22', '-', 0, 1, 'Healing Everywhere', '2023-09-05 15:50:38', 0, '-', '-', 'Feb22', 1, 'Oct24', '-', 'YLWS6P1', 1, 0, 0, '173-WhatsApp-Image-2025-01-05-at-8.26.56-PM.jpeg', 'English', 5, 1),
(202, '-', 'Kumba', 'Moses', 'kumbamoses24@gmail.com', '07984530872', '', 1, 'United Kingdom', '80.42.12.243', 'Buckinghamshire', 'High Wycombe', 'English', '1970-01-01', 1, '$1$$ZsL6g9GnrID1Ps6LiUA1k/', 'jamin232', 32, 0, 0, 0, 0, 32, 0, 0, '-', '-', 0, 509935, '2025-06-30 09:05:28', '2024-07-24 06:03:28', 1, 1, 1, 1, 1, '-', '-', 11, 1, 'Healing Everywhere', '2023-09-08 19:19:53', 0, 'Jan22', '-', '-', 0, 'Jul24', 'Mar22', '-', 1, 0, 0, '-', 'English', 5, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`subscriberId`),
  ADD UNIQUE KEY `emal` (`email`),
  ADD KEY `crypt_val` (`crypt_val`),
  ADD KEY `zoneId` (`zoneId`),
  ADD KEY `familyId` (`familyId`),
  ADD KEY `vc_refId` (`vc_refId`),
  ADD KEY `groupId` (`groupId`),
  ADD KEY `churchId` (`churchId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `subscriberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14157436;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
