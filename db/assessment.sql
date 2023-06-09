USE [assessmentDB]
GO
ALTER TABLE [dbo].[Stocks] DROP CONSTRAINT [FK_Stocks_Wholesalers_WholesalerId]
GO
ALTER TABLE [dbo].[Stocks] DROP CONSTRAINT [FK_Stocks_Products_ProductId]
GO
ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK_Products_Companies_CompanyId]
GO
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Wholesalers_WholesalerId]
GO
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Products_ProductId]
GO
/****** Object:  Index [IX_Stocks_WholesalerId]    Script Date: 4/1/2023 5:34:26 PM ******/
DROP INDEX [IX_Stocks_WholesalerId] ON [dbo].[Stocks]
GO
/****** Object:  Index [IX_Stocks_ProductId]    Script Date: 4/1/2023 5:34:26 PM ******/
DROP INDEX [IX_Stocks_ProductId] ON [dbo].[Stocks]
GO
/****** Object:  Index [IX_Products_CompanyId]    Script Date: 4/1/2023 5:34:26 PM ******/
DROP INDEX [IX_Products_CompanyId] ON [dbo].[Products]
GO
/****** Object:  Index [IX_Orders_WholesalerId]    Script Date: 4/1/2023 5:34:26 PM ******/
DROP INDEX [IX_Orders_WholesalerId] ON [dbo].[Orders]
GO
/****** Object:  Index [IX_Orders_ProductId]    Script Date: 4/1/2023 5:34:26 PM ******/
DROP INDEX [IX_Orders_ProductId] ON [dbo].[Orders]
GO
/****** Object:  Table [dbo].[Wholesalers]    Script Date: 4/1/2023 5:34:26 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Wholesalers]') AND type in (N'U'))
DROP TABLE [dbo].[Wholesalers]
GO
/****** Object:  Table [dbo].[Stocks]    Script Date: 4/1/2023 5:34:26 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Stocks]') AND type in (N'U'))
DROP TABLE [dbo].[Stocks]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 4/1/2023 5:34:26 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND type in (N'U'))
DROP TABLE [dbo].[Products]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 4/1/2023 5:34:26 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
DROP TABLE [dbo].[Orders]
GO
/****** Object:  Table [dbo].[Companies]    Script Date: 4/1/2023 5:34:26 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Companies]') AND type in (N'U'))
DROP TABLE [dbo].[Companies]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/1/2023 5:34:26 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[__EFMigrationsHistory]') AND type in (N'U'))
DROP TABLE [dbo].[__EFMigrationsHistory]
GO
USE [master]
GO
/****** Object:  Database [assessmentDB]    Script Date: 4/1/2023 5:34:26 PM ******/
DROP DATABASE [assessmentDB]
GO
/****** Object:  Database [assessmentDB]    Script Date: 4/1/2023 5:34:27 PM ******/
CREATE DATABASE [assessmentDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'assessmentDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\assessmentDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'assessmentDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\assessmentDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [assessmentDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [assessmentDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [assessmentDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [assessmentDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [assessmentDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [assessmentDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [assessmentDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [assessmentDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [assessmentDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [assessmentDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [assessmentDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [assessmentDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [assessmentDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [assessmentDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [assessmentDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [assessmentDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [assessmentDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [assessmentDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [assessmentDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [assessmentDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [assessmentDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [assessmentDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [assessmentDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [assessmentDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [assessmentDB] SET RECOVERY FULL 
GO
ALTER DATABASE [assessmentDB] SET  MULTI_USER 
GO
ALTER DATABASE [assessmentDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [assessmentDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [assessmentDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [assessmentDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [assessmentDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [assessmentDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'assessmentDB', N'ON'
GO
ALTER DATABASE [assessmentDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [assessmentDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [assessmentDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/1/2023 5:34:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Companies]    Script Date: 4/1/2023 5:34:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Companies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 4/1/2023 5:34:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClientName] [nvarchar](100) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Discount] [int] NOT NULL,
	[TotalPrice] [real] NOT NULL,
	[ProductId] [int] NOT NULL,
	[WholesalerId] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 4/1/2023 5:34:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [text] NULL,
	[Price] [real] NOT NULL,
	[CompanyId] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stocks]    Script Date: 4/1/2023 5:34:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stocks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[WholesalerId] [int] NOT NULL,
 CONSTRAINT [PK_Stocks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Wholesalers]    Script Date: 4/1/2023 5:34:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Wholesalers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Wholesalers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230331144100_create_assesment_database', N'6.0.15')
GO
SET IDENTITY_INSERT [dbo].[Companies] ON 
GO
INSERT [dbo].[Companies] ([Id], [Name]) VALUES (1, N'Anker')
GO
SET IDENTITY_INSERT [dbo].[Companies] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 
GO
INSERT [dbo].[Orders] ([Id], [ClientName], [Quantity], [Discount], [TotalPrice], [ProductId], [WholesalerId]) VALUES (1, N'Nabil GAYL', 15, 10, 350.865, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [Price], [CompanyId]) VALUES (1, N'Anker Power Strip Surge Protector (2100J)', N'All the Power You Need: Features 12 AC outlets, 1 USB-C port, and 2 USB-A ports to give you everything you need to power up all of your appliances and mobile devices.', 26.99, 1)
GO
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET IDENTITY_INSERT [dbo].[Stocks] ON 
GO
INSERT [dbo].[Stocks] ([Id], [Quantity], [ProductId], [WholesalerId]) VALUES (1, 17, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[Stocks] OFF
GO
SET IDENTITY_INSERT [dbo].[Wholesalers] ON 
GO
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (1, N'Mantino')
GO
SET IDENTITY_INSERT [dbo].[Wholesalers] OFF
GO
/****** Object:  Index [IX_Orders_ProductId]    Script Date: 4/1/2023 5:34:27 PM ******/
CREATE NONCLUSTERED INDEX [IX_Orders_ProductId] ON [dbo].[Orders]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_WholesalerId]    Script Date: 4/1/2023 5:34:27 PM ******/
CREATE NONCLUSTERED INDEX [IX_Orders_WholesalerId] ON [dbo].[Orders]
(
	[WholesalerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Products_CompanyId]    Script Date: 4/1/2023 5:34:27 PM ******/
CREATE NONCLUSTERED INDEX [IX_Products_CompanyId] ON [dbo].[Products]
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stocks_ProductId]    Script Date: 4/1/2023 5:34:27 PM ******/
CREATE NONCLUSTERED INDEX [IX_Stocks_ProductId] ON [dbo].[Stocks]
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stocks_WholesalerId]    Script Date: 4/1/2023 5:34:27 PM ******/
CREATE NONCLUSTERED INDEX [IX_Stocks_WholesalerId] ON [dbo].[Stocks]
(
	[WholesalerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Products_ProductId] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Products_ProductId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Wholesalers_WholesalerId] FOREIGN KEY([WholesalerId])
REFERENCES [dbo].[Wholesalers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Wholesalers_WholesalerId]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Companies_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Companies] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Companies_CompanyId]
GO
ALTER TABLE [dbo].[Stocks]  WITH CHECK ADD  CONSTRAINT [FK_Stocks_Products_ProductId] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Stocks] CHECK CONSTRAINT [FK_Stocks_Products_ProductId]
GO
ALTER TABLE [dbo].[Stocks]  WITH CHECK ADD  CONSTRAINT [FK_Stocks_Wholesalers_WholesalerId] FOREIGN KEY([WholesalerId])
REFERENCES [dbo].[Wholesalers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Stocks] CHECK CONSTRAINT [FK_Stocks_Wholesalers_WholesalerId]
GO
USE [master]
GO
ALTER DATABASE [assessmentDB] SET  READ_WRITE 
GO
