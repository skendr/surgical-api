const Operation = require('../models/operationModel');
const procedureService = require('../services/procedureService.js');

const createOperation = async (req, res) => {
    const { userId, operationId, doctorId, filename, } = req.body;
    try {

        const operationExists = await Operation.findOne({ operationId });
        if (operationExists) {
            res.status(400).json({ error: 'Operation already exists' })
            return;
        }

        const suggestedProcedures = await procedureService.getSuggestedProcedures(filename);

        const operation = new Operation({
            userId,
            doctorId,
            filename,
            suggestedProcedures
        });

        await operation.save();

        res.status(201).json(operation);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getOperation = async (req, res) => {
    const operationId = req.body.operationId;
    try {

        const operation = await Operation.findOne({ operationId });
        if (operation) {
            
            res.json(operation)

        } else {
            res.status(404).json({ error: 'Operation Not Found' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateOperation = async (req, res) => {
    const operationId = req.body.operationId;
    
    try {
        const operation = await Operation.findOne({ operationId });
        if (operation) {
           
            const { userId, doctorId, operationId, filename, procedureName} = req.body;

            operation.userId = userId ? userId  : operation.userId;
            operation.doctorId = doctorId ? doctorId  : operation.doctorId;
            operation.operationId = operationId ? operationId  : operation.operationId;
            operation.filename = filename ? filename  : operation.filename;
            operation.procedureName = procedureName ? procedureName  : operation.procedureName;

            await operation.save();

            res.json(operation);
        } else {
			res.status(404).json({ error: 'Operation Not Found' });
		}

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteOperation = async (req, res) => {
    const operationId = req.body.operationId;
    try {
        const result = await Operation.deleteOne({ operationId });

		if (result.deletedCount > 0) {
			res.json({ message: 'Operation Deleted Successfully' });
		} else {
			res.status(404).json({ error: 'Operation Not Found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
    createOperation,
    getOperation,
    updateOperation,
    deleteOperation
};