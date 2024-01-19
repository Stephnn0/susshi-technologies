"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedResults = void 0;
function paginatedResults(model) {
    return async (req, res, next) => {
        const { page, perPage } = req.query;
        const startIndex = (Number(page) - 1) * Number(perPage);
        const endIndex = Number(page) * Number(perPage);
        const results = {
            next: {
                page: 0,
                limit: 0
            },
            previous: {
                page: 0,
                limit: 0
            },
            results: null
        };
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: Number(page) + 1,
                limit: Number(perPage)
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: Number(page) - 1,
                limit: Number(perPage)
            };
        }
        try {
            results.results = await model.find().sort({ date: -1 }).limit(Number(perPage)).skip(startIndex).exec;
            res.paginatedResults = results;
            console.log(' results results ', results);
            next();
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}
exports.paginatedResults = paginatedResults;
//# sourceMappingURL=pagination.js.map