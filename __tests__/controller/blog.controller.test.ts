import { describe, it, expect, vi } from 'vitest';
import { ceateBlogHandler } from '../../src/controller/blog.controller'
import { createBlog } from '../../src/service/blog.service'
import { Request, Response, NextFunction } from 'express';

vi.mock('../../src/service/blog.servic', () => ({
    createBlog: vi.fn(),
}));

describe('ceateBlogHandler', () => {
    it('should create a blog and return 201 status code on success', async () => {
        // Mocked blog object to return from createBlog service
        const mockBlog = {
            _id: '12345',
            title: 'Test Blog',
            content: 'Test Content',
            author: {
                _id: 'userId',
                userName: 'testUser',
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        // Mock createBlog to resolve with the mockBlog object
        (createBlog as any).mockResolvedValue(mockBlog); // Using 'as any' type casting

        // Mock req, res, next
        const req = {
            body: {
                title: 'Test Blog',
                content: 'Test Content',
            },
        } as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
            locals: {
                user: {
                    _id: 'userId',
                    userName: 'testUser',
                },
            },
        } as unknown as Response;

        const next = vi.fn() as NextFunction;

        // Call the handler
        await ceateBlogHandler(req, res, next);

        // Assertions
        expect(createBlog).toHaveBeenCalledWith({
            title: 'Test Blog',
            content: 'Test Content',
            author: {
                _id: 'userId',
                userName: 'testUser',
            },
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(mockBlog);
        expect(next).not.toHaveBeenCalled();
    });
});