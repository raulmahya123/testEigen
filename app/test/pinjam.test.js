const { findAllBooks } = require('../controllers/pinjam.controller.js');

describe('findAllBooks', () => {
    it('should return list of books with their quantities', async () => {
        const mockBooks = [
            { title: 'Book 1', author: 'Author 1' },
            { title: 'Book 2', author: 'Author 2' }
        ];
        const mockHistory = [
            { title: 'Book 1' },
            { title: 'Book 1' },
            { title: 'Book 2' }
        ];

        const Book = require('../models/Book');
        const History = require('../models/History');
        Book.find.mockResolvedValue(mockBooks);
        History.find.mockResolvedValue(mockHistory);

        const mockRes = {
            send: jest.fn()
        };

        await findAllBooks(mockRes);

        // Check if the response is sent with the correct data
        expect(mockRes.send).toHaveBeenCalledWith([
            { title: 'Book 1', quantity: 2 },
            { title: 'Book 2', quantity: 1 }
        ]);
    });

    it('should handle errors', async () => {
        // Mocking Book.find() and History.find() to throw an error
        const Book = require('../models/Book');
        const History = require('../models/History');
        Book.find.mockRejectedValue(new Error('Database error'));
        History.find.mockRejectedValue(new Error('Database error'));

        // Mock response object
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Call the function
        await findAllBooks(mockRes);

        // Check if an error response is sent
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({
            message: 'Database error'
        });
    });
});
