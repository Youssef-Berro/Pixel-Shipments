INSERT INTO Users (email, password, role, createdAt, updatedAt)
VALUES 
('user1@example.com', '$2b$12$kC8WHkiUQ8FHCodHJzfmBujZrhW5WYZTkJi6Fjnn3/RGaSItb9M6O', 'user', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
('user2@example.com', '$2b$12$kC8WHkiUQ8FHCodHJzfmBujZrhW5WYZTkJi6Fjnn3/RGaSItb9M6O', 'user', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
('user3@example.com', '$2b$12$kC8WHkiUQ8FHCodHJzfmBujZrhW5WYZTkJi6Fjnn3/RGaSItb9M6O', 'user', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
('admin@example.com', '$2b$12$kC8WHkiUQ8FHCodHJzfmBujZrhW5WYZTkJi6Fjnn3/RGaSItb9M6O', 'admin', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());



INSERT INTO Shipments (waybill, userEmail, customerName, customerAddress, customerNb, createdAt, updatedAt)
VALUES
(3, 'user1@example.com', 'Mehdi', 'Lebanon, Jnoub', 81855511, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(6, 'user1@example.com', 'Mohammad', 'Lebanon, Matn', 03776561, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(5, 'user1@example.com', 'Youssef', 'Lebanon, Matn', 81892550, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(1, 'user1@example.com', 'Ali', 'Lebanon, Matn', 03873340, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(10, 'user1@example.com', 'Sami', 'Lebanon, Baalback', 80876591, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(15, 'user1@example.com', 'Samer', 'Lebanon, Jbeil', 76126514, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(17, 'user1@example.com', 'Jamil', 'Lebanon, Jbeil', 76776578, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(21, 'user1@example.com', 'Eliana', 'Lebanon, Jnoub', 05976522, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(4, 'user1@example.com', 'Diana', 'Lebanon, Jbeil', 8184543, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(8, 'user1@example.com', 'Patrick', 'Lebanon, Jbeil', 03886515, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(2, 'user1@example.com', 'Wassim', 'Lebanon, Matn', 81871133, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(1, 'user2@example.com', 'Hassan', 'Lebanon, Jbeil', 01245678, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(2, 'user2@example.com', 'Asmar', 'Lebanon, Jbeil', 01394824, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(3, 'user2@example.com', 'Patrick', 'Lebanon, Jbeil', 01945823, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(4, 'user2@example.com', 'Elias', 'Lebanon, Jbeil', 03569234, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(5, 'user2@example.com', 'Ali', 'Lebanon, Jbeil', 098744322, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(6, 'user2@example.com', 'Walid', 'Lebanon, Jbeil', 056713444, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(7, 'user2@example.com', 'Younes', 'Lebanon, Jbeil', 098776566, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(8, 'user2@example.com', 'Ashraf', 'Lebanon, Jbeil', 81876511, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(19, 'user1@example.com', 'Haysam', 'Lebanon, Tripoly', 81876566, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(1, 'user3@example.com', 'Fadi', 'Lebanon, Beirut, Street 14', 12345678, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(2, 'user3@example.com', 'Wassim', 'Lebanon, Beirut, Street 1', 03243567, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(3, 'user3@example.com', 'Fadi', 'Lebanon, Beirut, Street 21', 87443200, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()),
(12, 'user3@example.com', 'Wassim', 'Lebanon, Beirut, Street 16', 12345678, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());