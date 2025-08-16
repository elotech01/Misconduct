-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2025 at 12:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tmcdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `investigation_id` int(11) NOT NULL,
  `action_type` varchar(100) NOT NULL,
  `notes` text DEFAULT NULL,
  `date_taken` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appeals`
--

CREATE TABLE `appeals` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `reason` text NOT NULL,
  `status` enum('submitted','under review','resolved') DEFAULT 'submitted',
  `filed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `investigations`
--

CREATE TABLE `investigations` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `investigator_name` varchar(255) NOT NULL,
  `status` enum('open','in progress','closed') DEFAULT 'open',
  `findings` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programmes`
--

CREATE TABLE `programmes` (
  `pid` int(10) NOT NULL,
  `school_id` int(11) DEFAULT NULL,
  `programme` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `statements` text NOT NULL,
  `documents` varchar(100) NOT NULL,
  `status` enum('pending','reviewed','closed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(10) NOT NULL,
  `school_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `identification_number` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `role` enum('student','staff','admin') DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `identification_number`, `password_hash`, `full_name`, `role`, `created_at`, `active`) VALUES
(1, 'test@gmail.com', 'N81881991', 'cGFzc3dvcmQ=', 'william kiilo', 'student', '2025-08-05 12:14:57', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_actions_full`
-- (See below for the actual view)
--
CREATE TABLE `view_actions_full` (
`action_id` int(11)
,`action_type` varchar(100)
,`notes` text
,`date_taken` date
,`investigator_name` varchar(255)
,`report_type` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_appeals_summary`
-- (See below for the actual view)
--
CREATE TABLE `view_appeals_summary` (
`appeal_id` int(11)
,`report_id` int(11)
,`reason` text
,`status` enum('submitted','under review','resolved')
,`filed_at` timestamp
,`reported_by` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_investigations_full`
-- (See below for the actual view)
--
CREATE TABLE `view_investigations_full` (
`investigation_id` int(11)
,`report_id` int(11)
,`investigator_name` varchar(255)
,`status` enum('open','in progress','closed')
,`findings` text
,`created_at` timestamp
,`reporter` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_reports_detailed`
-- (See below for the actual view)
--
CREATE TABLE `view_reports_detailed` (
`report_id` int(11)
,`reported_by` varchar(255)
,`email` varchar(255)
,`type` varchar(100)
,`status` enum('pending','reviewed','closed')
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Structure for view `view_actions_full`
--
DROP TABLE IF EXISTS `view_actions_full`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_actions_full`  AS SELECT `a`.`id` AS `action_id`, `a`.`action_type` AS `action_type`, `a`.`notes` AS `notes`, `a`.`date_taken` AS `date_taken`, `i`.`investigator_name` AS `investigator_name`, `r`.`type` AS `report_type` FROM ((`actions` `a` join `investigations` `i` on(`a`.`investigation_id` = `i`.`id`)) join `reports` `r` on(`i`.`report_id` = `r`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `view_appeals_summary`
--
DROP TABLE IF EXISTS `view_appeals_summary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_appeals_summary`  AS SELECT `a`.`id` AS `appeal_id`, `r`.`id` AS `report_id`, `a`.`reason` AS `reason`, `a`.`status` AS `status`, `a`.`filed_at` AS `filed_at`, `u`.`full_name` AS `reported_by` FROM ((`appeals` `a` join `reports` `r` on(`a`.`report_id` = `r`.`id`)) join `users` `u` on(`r`.`user_id` = `u`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `view_investigations_full`
--
DROP TABLE IF EXISTS `view_investigations_full`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_investigations_full`  AS SELECT `i`.`id` AS `investigation_id`, `r`.`id` AS `report_id`, `i`.`investigator_name` AS `investigator_name`, `i`.`status` AS `status`, `i`.`findings` AS `findings`, `i`.`created_at` AS `created_at`, `u`.`full_name` AS `reporter` FROM ((`investigations` `i` join `reports` `r` on(`i`.`report_id` = `r`.`id`)) join `users` `u` on(`r`.`user_id` = `u`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `view_reports_detailed`
--
DROP TABLE IF EXISTS `view_reports_detailed`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_reports_detailed`  AS SELECT `r`.`id` AS `report_id`, `u`.`full_name` AS `reported_by`, `u`.`email` AS `email`, `r`.`type` AS `type`, `r`.`status` AS `status`, `r`.`created_at` AS `created_at` FROM (`reports` `r` join `users` `u` on(`r`.`user_id` = `u`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_action_investigation` (`investigation_id`);

--
-- Indexes for table `appeals`
--
ALTER TABLE `appeals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_appeal_report` (`report_id`);

--
-- Indexes for table `investigations`
--
ALTER TABLE `investigations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_investigation_report` (`report_id`);

--
-- Indexes for table `programmes`
--
ALTER TABLE `programmes`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `programmes_school_id` (`school_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_report_user` (`user_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `school_name` (`school_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `indentification_number` (`identification_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appeals`
--
ALTER TABLE `appeals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `investigations`
--
ALTER TABLE `investigations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programmes`
--
ALTER TABLE `programmes`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actions`
--
ALTER TABLE `actions`
  ADD CONSTRAINT `actions_ibfk_1` FOREIGN KEY (`investigation_id`) REFERENCES `investigations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `appeals`
--
ALTER TABLE `appeals`
  ADD CONSTRAINT `appeals_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `investigations`
--
ALTER TABLE `investigations`
  ADD CONSTRAINT `investigations_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `programmes`
--
ALTER TABLE `programmes`
  ADD CONSTRAINT `programmes_school_id` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
