const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../Database/db_connect');
const statusCodes = require('../constants/statusCodes.js');
const errorCodes = require('../constants/errorCodes.js');

// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];

//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const token = bearer[1];

//         jwt.verify(token, 'your_jwt_secret', (err, authData) => {
//             if (err) {
//                 res.sendStatus(403);
//             } else {
//                 req.user = authData;
//                 next();
//             }
//         });
//     } else {
//         res.sendStatus(403);
//     }
// };

const correctFeedbackController = {
    async correctFeedback(req, res, next) {
        try {
            const { ID, correctFeedback, feedback } = req.body;
            const thisID = Math.random().toString(36).substring(2, 15);
            if (correctFeedback) {
                // Store correct feedback in the Correct_Feedback table
                const correctFeedbackQuery = `
                    INSERT INTO Correct_Feedback (ID, Prediction_ID, Feedback)
                    VALUES (?, ?, ?)
                `;
                

                pool.query(correctFeedbackQuery, [thisID, ID, correctFeedback], (err, result) => {
                    if (err) {
                        console.error('Error storing correct feedback:', err);
                        return res.status(statusCodes[1]).json({
                            success: false,
                            errorCode: 1,
                            message: errorCodes[1]
                        });
                    }

                    return res.json({
                        success: true,
                    });
                });
            } else {
                // Store incorrect feedback in the Incorrect_Feedback table
                const incorrectFeedbackQuery = `
                    INSERT INTO Incorrect_Feedback (ID, Prediction_ID, Feedback)
                    VALUES (?, ?, ?)
                `;
                pool.query(incorrectFeedbackQuery, [thisID, ID, feedback], (err, result) => {
                    if (err) {
                        console.error('Error storing incorrect feedback:', err);
                        return res.status(statusCodes[1]).json({
                            success: false,
                            errorCode: 1,
                            message: errorCodes[1]
                        });
                    }

                    return res.json({
                        success: true,
                    });
                });
            }
        } catch (error) {
            console.error('Error in "/correctFeedback" endpoint:', error);
            return res.status(statusCodes[3]).json({
                success: false,
                errorCode: 3,
                message: errorCodes[3]
            });
        }
    }
}

module.exports = correctFeedbackController;