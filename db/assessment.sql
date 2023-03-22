USE [assessmentDB]
GO
ALTER TABLE [dbo].[Stocks] DROP CONSTRAINT [FK_Stocks_Wholesalers_WholesalerId]
GO
ALTER TABLE [dbo].[Stocks] DROP CONSTRAINT [FK_Stocks_Beers_BeerId]
GO
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Wholesalers_WholesalerId]
GO
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [FK_Orders_Beers_BeerId]
GO
ALTER TABLE [dbo].[Beers] DROP CONSTRAINT [FK_Beers_Breweries_BreweryId]
GO
/****** Object:  Index [IX_Stocks_WholesalerId]    Script Date: 3/22/2023 6:09:44 PM ******/
DROP INDEX [IX_Stocks_WholesalerId] ON [dbo].[Stocks]
GO
/****** Object:  Index [IX_Stocks_BeerId]    Script Date: 3/22/2023 6:09:44 PM ******/
DROP INDEX [IX_Stocks_BeerId] ON [dbo].[Stocks]
GO
/****** Object:  Index [IX_Orders_WholesalerId]    Script Date: 3/22/2023 6:09:44 PM ******/
DROP INDEX [IX_Orders_WholesalerId] ON [dbo].[Orders]
GO
/****** Object:  Index [IX_Orders_BeerId]    Script Date: 3/22/2023 6:09:44 PM ******/
DROP INDEX [IX_Orders_BeerId] ON [dbo].[Orders]
GO
/****** Object:  Index [IX_Beers_BreweryId]    Script Date: 3/22/2023 6:09:44 PM ******/
DROP INDEX [IX_Beers_BreweryId] ON [dbo].[Beers]
GO
/****** Object:  Table [dbo].[Wholesalers]    Script Date: 3/22/2023 6:09:44 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Wholesalers]') AND type in (N'U'))
DROP TABLE [dbo].[Wholesalers]
GO
/****** Object:  Table [dbo].[Stocks]    Script Date: 3/22/2023 6:09:44 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Stocks]') AND type in (N'U'))
DROP TABLE [dbo].[Stocks]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 3/22/2023 6:09:44 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
DROP TABLE [dbo].[Orders]
GO
/****** Object:  Table [dbo].[Breweries]    Script Date: 3/22/2023 6:09:44 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Breweries]') AND type in (N'U'))
DROP TABLE [dbo].[Breweries]
GO
/****** Object:  Table [dbo].[Beers]    Script Date: 3/22/2023 6:09:44 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Beers]') AND type in (N'U'))
DROP TABLE [dbo].[Beers]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 3/22/2023 6:09:44 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[__EFMigrationsHistory]') AND type in (N'U'))
DROP TABLE [dbo].[__EFMigrationsHistory]
GO
USE [master]
GO
/****** Object:  Database [assessmentDB]    Script Date: 3/22/2023 6:09:44 PM ******/
DROP DATABASE [assessmentDB]
GO
/****** Object:  Database [assessmentDB]    Script Date: 3/22/2023 6:09:44 PM ******/
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
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 3/22/2023 6:09:44 PM ******/
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
/****** Object:  Table [dbo].[Beers]    Script Date: 3/22/2023 6:09:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Beers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Content] [real] NOT NULL,
	[Price] [real] NOT NULL,
	[BreweryId] [int] NOT NULL,
 CONSTRAINT [PK_Beers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Breweries]    Script Date: 3/22/2023 6:09:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Breweries](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Breweries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 3/22/2023 6:09:44 PM ******/
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
	[BeerId] [int] NOT NULL,
	[WholesalerId] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stocks]    Script Date: 3/22/2023 6:09:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stocks](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NOT NULL,
	[BeerId] [int] NOT NULL,
	[WholesalerId] [int] NOT NULL,
 CONSTRAINT [PK_Stocks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Wholesalers]    Script Date: 3/22/2023 6:09:44 PM ******/
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230320120620_create_tables_breweries_beers', N'6.0.15')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230320121133_create_tables_wholesalers', N'6.0.15')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230320121411_create_tables_wholesalers', N'6.0.15')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230320122035_create_tables_stocks', N'6.0.15')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230320122505_create_tables_orders', N'6.0.15')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20230322003729_create_tables_orders', N'6.0.15')
GO
SET IDENTITY_INSERT [dbo].[Beers] ON 

INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (2, N'American India Pale Ale', 3, 5.9, 1)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (3, N'A1', 2.9, 6.8, 2)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (4, N'A2', 7.2, 2, 2)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (5, N'degiral House Beer XR', 0.09, 12.99, 3)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (6, N'Leffe Blonde', 6.6, 2.2, 1)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (7, N'Dark Lager X2', 1.6, 5.5, 3)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (8, N'MillerCoors', 2.5, 5, 1)
INSERT [dbo].[Beers] ([Id], [Name], [Content], [Price], [BreweryId]) VALUES (9, N'Mikkeller', 1, 4.99, 3)
SET IDENTITY_INSERT [dbo].[Beers] OFF
GO
SET IDENTITY_INSERT [dbo].[Breweries] ON 

INSERT [dbo].[Breweries] ([Id], [Name]) VALUES (1, N'Planet Beer')
INSERT [dbo].[Breweries] ([Id], [Name]) VALUES (2, N'Abbay de Leffe')
INSERT [dbo].[Breweries] ([Id], [Name]) VALUES (3, N'Stone House Beer')
INSERT [dbo].[Breweries] ([Id], [Name]) VALUES (4, N'Arizona Bar')
INSERT [dbo].[Breweries] ([Id], [Name]) VALUES (5, N'David Bars')
SET IDENTITY_INSERT [dbo].[Breweries] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([Id], [ClientName], [Quantity], [Discount], [TotalPrice], [BeerId], [WholesalerId]) VALUES (1, N'Machia', 15, 10, 67.365, 9, 6)
INSERT [dbo].[Orders] ([Id], [ClientName], [Quantity], [Discount], [TotalPrice], [BeerId], [WholesalerId]) VALUES (2, N'Johnatan', 20, 20, 79.84, 9, 6)
INSERT [dbo].[Orders] ([Id], [ClientName], [Quantity], [Discount], [TotalPrice], [BeerId], [WholesalerId]) VALUES (3, N'Pedro', 13, 10, 25.74, 6, 2)
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Stocks] ON 

INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (1, 65, 2, 1)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (2, 30, 2, 3)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (3, 44, 4, 2)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (4, 25, 6, 1)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (5, 35, 7, 2)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (6, 30, 5, 1)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (7, 24, 5, 5)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (8, 5, 9, 6)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (9, 6, 2, 2)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (10, 20, 6, 2)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (11, 7, 5, 3)
INSERT [dbo].[Stocks] ([Id], [Quantity], [BeerId], [WholesalerId]) VALUES (12, 90, 3, 7)
SET IDENTITY_INSERT [dbo].[Stocks] OFF
GO
SET IDENTITY_INSERT [dbo].[Wholesalers] ON 

INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (1, N'Carlsberg')
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (2, N'GeneDrinks')
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (3, N'Genosous')
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (4, N'Ragnarok')
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (5, N'Crescent Crown')
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (6, N'Amstel Brewery')
INSERT [dbo].[Wholesalers] ([Id], [Name]) VALUES (7, N'Brewtation')
SET IDENTITY_INSERT [dbo].[Wholesalers] OFF
GO
/****** Object:  Index [IX_Beers_BreweryId]    Script Date: 3/22/2023 6:09:45 PM ******/
CREATE NONCLUSTERED INDEX [IX_Beers_BreweryId] ON [dbo].[Beers]
(
	[BreweryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_BeerId]    Script Date: 3/22/2023 6:09:45 PM ******/
CREATE NONCLUSTERED INDEX [IX_Orders_BeerId] ON [dbo].[Orders]
(
	[BeerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_WholesalerId]    Script Date: 3/22/2023 6:09:45 PM ******/
CREATE NONCLUSTERED INDEX [IX_Orders_WholesalerId] ON [dbo].[Orders]
(
	[WholesalerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stocks_BeerId]    Script Date: 3/22/2023 6:09:45 PM ******/
CREATE NONCLUSTERED INDEX [IX_Stocks_BeerId] ON [dbo].[Stocks]
(
	[BeerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Stocks_WholesalerId]    Script Date: 3/22/2023 6:09:45 PM ******/
CREATE NONCLUSTERED INDEX [IX_Stocks_WholesalerId] ON [dbo].[Stocks]
(
	[WholesalerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Beers]  WITH CHECK ADD  CONSTRAINT [FK_Beers_Breweries_BreweryId] FOREIGN KEY([BreweryId])
REFERENCES [dbo].[Breweries] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Beers] CHECK CONSTRAINT [FK_Beers_Breweries_BreweryId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Beers_BeerId] FOREIGN KEY([BeerId])
REFERENCES [dbo].[Beers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Beers_BeerId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Wholesalers_WholesalerId] FOREIGN KEY([WholesalerId])
REFERENCES [dbo].[Wholesalers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Wholesalers_WholesalerId]
GO
ALTER TABLE [dbo].[Stocks]  WITH CHECK ADD  CONSTRAINT [FK_Stocks_Beers_BeerId] FOREIGN KEY([BeerId])
REFERENCES [dbo].[Beers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Stocks] CHECK CONSTRAINT [FK_Stocks_Beers_BeerId]
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
