-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2017 a las 11:02:41
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `busseatsmanager`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinations`
--

CREATE TABLE `destinations` (
  `CITY` varchar(30) NOT NULL,
  `TOTALSEATS` int(11) NOT NULL,
  `AVAILABLESEATS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `destinations`
--

INSERT INTO `destinations` (`CITY`, `TOTALSEATS`, `AVAILABLESEATS`) VALUES
('Alicante', 28, 28),
('Barcelona', 29, 29),
('Burgos', 30, 30),
('Leon', 31, 31),
('Madrid', 32, 32),
('Salamanca', 33, 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `occupiedseats`
--

CREATE TABLE `occupiedseats` (
  `CITY` varchar(30) NOT NULL,
  `SEATNO` int(11) NOT NULL,
  `NIF` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `occupiedseats`
--

INSERT INTO `occupiedseats` (`CITY`, `SEATNO`, `NIF`) VALUES
('Leon', 1, 'asdf'),
('Leon', 9, 'asdf'),
('Leon', 10, 'asdf'),
('Leon', 11, 'asdf'),
('Leon', 12, 'asdf'),
('Leon', 17, 'asdf'),
('Leon', 18, 'asdf'),
('Leon', 19, 'asdf'),
('Leon', 20, 'asdf');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`CITY`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
