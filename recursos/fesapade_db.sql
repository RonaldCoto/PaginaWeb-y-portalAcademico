-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2021 a las 22:02:03
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fesapade_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones_cursos`
--

CREATE TABLE `asignaciones_cursos` (
  `id_asignacion_curso` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `asignaciones_cursos`
--

INSERT INTO `asignaciones_cursos` (`id_asignacion_curso`, `id_curso`, `id_empleado`) VALUES
(86, 39, 17),
(88, 40, 17),
(90, 41, 18),
(92, 43, 18),
(104, 44, 17),
(97, 45, 17),
(99, 46, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_empleados`
--

CREATE TABLE `categorias_empleados` (
  `id_cate_empleado` int(11) NOT NULL,
  `cargo` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `categorias_empleados`
--

INSERT INTO `categorias_empleados` (`id_cate_empleado`, `cargo`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'INSTRUCTOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `nombre` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `portada` varchar(250) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `imagen1` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `imagen2` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `imagen3` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `estado` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre`, `descripcion`, `portada`, `imagen1`, `imagen2`, `imagen3`, `estado`) VALUES
(39, 'Curso de introducción, nivel1 G01', 'Para los estudiantes de curso en tierra, mayo 2021', '1621621404depositphotos_137940314-stock-photo-training-for-skydiving-and-parachuting.jpg', NULL, NULL, NULL, 'FINALIZADO'),
(40, 'Curso de introducción a equipo G01', 'Enseñanza de uso de equipo, mayo 2021', '1621621867depositphotos_139670826-stock-photo-observing-how-to-put-the.jpg', NULL, NULL, NULL, 'FINALIZADO'),
(41, 'Salto con linea G01', 'Para estudiantes en el curso de salto con linea, mayo 2021', '1621622192Skydiving-Business.jpg', NULL, NULL, NULL, 'FINALIZADO'),
(42, 'Clases teoricas', 'Enseñanza sobre: Equipamiento y accesorios, procedimientos en el avión y ascenso, salida del avión en posición estable, Ejercicios en caída libre, apertura y manejo del paracaídas, situaciones y procedimientos especificos', '162162299169211362_666103857206411_5487863259526594560_n.png', '162162299154353979_570833243400140_2219771628378652672_n.jpg', '162162299170015758_676184766198320_6665155615456755712_n.jpg', '1621622991140693819_1039513949865398_7865891432269012805_n.jpg', 'VISUAL'),
(43, 'Caída Libre G01', 'Para estudiantes en prácticas de caida libre, junio 2021', '1621623571134654904_1027147201102073_350278393016694750_n.jpg', NULL, NULL, NULL, 'INICIADO'),
(44, 'Curso de introducción, nivel1 G02', 'Para los estudiantes de curso en tierra, junio 2021', '1621626312depositphotos_137940314-stock-photo-training-for-skydiving-and-parachuting.jpg', NULL, NULL, NULL, 'INICIADO'),
(45, 'Curso de introducción a equipo G02', 'Enseñanza de uso de equipo, junio 2021', '1621626347depositphotos_139670826-stock-photo-observing-how-to-put-the.jpg', NULL, NULL, NULL, 'INICIADO'),
(46, 'Salto con linea G02', 'Para estudiantes en el curso de salto con linea, junio 2021', '1621626436Skydiving-Business.jpg', NULL, NULL, NULL, 'INICIADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellido` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_cate_empleado` int(11) NOT NULL,
  `estado` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellido`, `direccion`, `email`, `password`, `id_cate_empleado`, `estado`) VALUES
(1, 'adonis', 'arevalo', 'soyapango, San Salvador', 'adonisarevalo503@gmail.com', '9ed660a53803d004219f723faa508a7f127a75d2', 1, 'ALTA'),
(16, 'Ronald Ernesto', 'Coto Hernandez', 'Soyapango, San Salvador', 'ronal_hndz@hotmail.com', '9ed660a53803d004219f723faa508a7f127a75d2', 1, 'ALTA'),
(17, 'Carlos Enrique ', 'Merino Navarro', 'Ilopango, San Salvador', 'carlos90@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 2, 'ALTA'),
(18, 'Diego Alberto ', 'Lemus Torres', 'San Fernando, San Salvador', 'diego90@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 2, 'ALTA'),
(19, 'Edgard Alexander ', 'Barrera Flamenco', 'La Sultana, San Salvador', 'edgard90@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 2, 'BAJA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluaciones`
--

CREATE TABLE `evaluaciones` (
  `id_evaluacion` int(11) NOT NULL,
  `nombre` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(450) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `porcentaje` double(5,2) NOT NULL,
  `multimedia` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `extension` varchar(10) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `evaluaciones`
--

INSERT INTO `evaluaciones` (`id_evaluacion`, `nombre`, `descripcion`, `porcentaje`, `multimedia`, `extension`, `fecha_inicio`, `fecha_fin`, `id_curso`) VALUES
(27, 'evaluación 1', 'prueba teórica', 30.00, '', '', '2021-06-01', '2021-06-02', 39),
(28, 'evaluación 2', 'prueba teórica 2', 30.00, '', '', '2021-06-10', '2021-06-11', 39),
(29, 'prueba final', 'examén final', 40.00, '', '', '2021-06-14', '2021-06-15', 39),
(30, 'prueba 1', 'prueba teórica 1', 35.00, '', '', '2021-06-02', '2021-06-03', 40),
(31, 'prueba 2', 'prueba teórica 2', 35.00, '', '', '2021-06-08', '2021-06-09', 40),
(32, 'prueba final', 'prueba final de curso.', 30.00, '', '', '2021-06-14', '2021-06-15', 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `federados`
--

CREATE TABLE `federados` (
  `id_federado` int(11) NOT NULL,
  `nombre` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellido` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `estado` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `federados`
--

INSERT INTO `federados` (`id_federado`, `nombre`, `apellido`, `direccion`, `email`, `password`, `estado`) VALUES
(14, 'Erick Fabricio ', 'Arévalo Henríquez', 'Colonia El Rosal, San Salvador', 'erick92@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(15, 'Gerardo Javier', ' López Flamenco', 'Colonia Dina, San Salvador', 'gerardo93@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(16, 'Herson Miguel ', 'Serrano Chacón', 'El Pedregal, San Salvador', 'herson1991@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(17, 'Irvin Alexis ', 'Castro Rivera', 'La Rabida, San Salvador', 'irvin996@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(18, 'José Alberto ', 'Martínez Bonilla', 'Lomas de San Francisco, San Salvador', 'jose990@outlook.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(19, 'Katherine Milagro ', 'Alfaro Rico', 'Santa Leonor, San Salvador', 'katherine1991@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(20, 'Roberto Carlos ', 'Reyes Gómez', 'San Jacinto, San Salvador', 'roberto90@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(21, 'Pamela Giselle ', 'Chipagua Hernández', 'Colonia Maquilishuat, San Salvador', 'pamela93@hotmail.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA'),
(22, 'Miguel Alejandro ', 'Meléndez Martínez', 'Colonia Escalon, San Salvador', 'miguel90@outlook.com', '7c222fb2927d828af22f592134e8932480637c0d', 'ALTA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

CREATE TABLE `matriculas` (
  `id_matricula` int(11) NOT NULL,
  `id_federado` int(11) NOT NULL,
  `id_asignacion_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `matriculas`
--

INSERT INTO `matriculas` (`id_matricula`, `id_federado`, `id_asignacion_curso`) VALUES
(67, 14, 86),
(76, 14, 97),
(68, 15, 86),
(77, 15, 97),
(69, 16, 86),
(78, 16, 97),
(70, 17, 88),
(79, 17, 99),
(71, 18, 88),
(80, 18, 99),
(72, 19, 88),
(81, 19, 99),
(73, 20, 90),
(82, 20, 92),
(74, 21, 90),
(83, 21, 92),
(75, 22, 90),
(84, 22, 92);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id_nota` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `nota` double(5,2) DEFAULT NULL,
  `promedio` double(5,2) DEFAULT NULL,
  `id_matricula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id_nota`, `id_evaluacion`, `nota`, `promedio`, `id_matricula`) VALUES
(51, 27, 9.00, 2.70, 67),
(52, 28, 10.00, 3.00, 67),
(53, 29, 8.00, 3.20, 67),
(54, 27, 7.00, 2.10, 68),
(55, 28, 10.00, 3.00, 68),
(56, 29, 10.00, 4.00, 69),
(57, 27, 8.00, 2.40, 69),
(58, 28, 9.00, 2.70, 69),
(59, 29, 9.00, 3.60, 68),
(60, 30, 9.00, 3.15, 70),
(61, 31, 7.00, 2.45, 70),
(62, 32, 10.00, 3.00, 70),
(63, 30, 8.00, 2.80, 71),
(64, 31, 10.00, 3.50, 71),
(65, 32, 10.00, 3.00, 71),
(66, 30, 9.00, 3.15, 72),
(67, 31, 9.00, 3.15, 72),
(68, 32, 10.00, 3.00, 72);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `titulo` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `archivo` varchar(250) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `extension` varchar(10) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `id_asignacion_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones_cursos`
--
ALTER TABLE `asignaciones_cursos`
  ADD PRIMARY KEY (`id_asignacion_curso`),
  ADD KEY `id_curso` (`id_curso`,`id_empleado`),
  ADD KEY `asignaciones_cursos_ibfk_2` (`id_empleado`);

--
-- Indices de la tabla `categorias_empleados`
--
ALTER TABLE `categorias_empleados`
  ADD PRIMARY KEY (`id_cate_empleado`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_cate_empleado` (`id_cate_empleado`);

--
-- Indices de la tabla `evaluaciones`
--
ALTER TABLE `evaluaciones`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `federados`
--
ALTER TABLE `federados`
  ADD PRIMARY KEY (`id_federado`);

--
-- Indices de la tabla `matriculas`
--
ALTER TABLE `matriculas`
  ADD PRIMARY KEY (`id_matricula`),
  ADD KEY `id_federado` (`id_federado`,`id_asignacion_curso`),
  ADD KEY `matriculas_ibfk_1` (`id_asignacion_curso`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id_nota`),
  ADD KEY `id_matricula` (`id_matricula`),
  ADD KEY `id_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `id_asignacion_curso` (`id_asignacion_curso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones_cursos`
--
ALTER TABLE `asignaciones_cursos`
  MODIFY `id_asignacion_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `categorias_empleados`
--
ALTER TABLE `categorias_empleados`
  MODIFY `id_cate_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `evaluaciones`
--
ALTER TABLE `evaluaciones`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `federados`
--
ALTER TABLE `federados`
  MODIFY `id_federado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `matriculas`
--
ALTER TABLE `matriculas`
  MODIFY `id_matricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones_cursos`
--
ALTER TABLE `asignaciones_cursos`
  ADD CONSTRAINT `asignaciones_cursos_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `asignaciones_cursos_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_cate_empleado`) REFERENCES `categorias_empleados` (`id_cate_empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluaciones`
--
ALTER TABLE `evaluaciones`
  ADD CONSTRAINT `evaluaciones_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matriculas`
--
ALTER TABLE `matriculas`
  ADD CONSTRAINT `matriculas_ibfk_1` FOREIGN KEY (`id_asignacion_curso`) REFERENCES `asignaciones_cursos` (`id_asignacion_curso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matriculas_ibfk_2` FOREIGN KEY (`id_federado`) REFERENCES `federados` (`id_federado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id_evaluacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notas_ibfk_2` FOREIGN KEY (`id_matricula`) REFERENCES `matriculas` (`id_matricula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`id_asignacion_curso`) REFERENCES `asignaciones_cursos` (`id_asignacion_curso`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
