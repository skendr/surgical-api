const axios = require('axios');

const splitFilename = (filename) => {
    // could write more advanced code here to get specific keywords that you might need
    return filename.split(/[_\s-/]+/)
        .filter(word => isNaN(word));
};

const getSuggestedProcedures = async (filename) => {
    try {
        const filenameWords = splitFilename(filename);
        const suggestedProceduresArray = await Promise.all(filenameWords.map(word => getProcedureFromKeyword(word)));
        
        const uniqueProceduresSet = new Set(suggestedProceduresArray.flat());
        const uniqueProceduresArray = [...uniqueProceduresSet];

        return uniqueProceduresArray;
    } catch (error) {
        throw error;
    }
}

const getProcedureFromKeyword = async (keyword) => {
    try {

        const url = "https://clinicaltables.nlm.nih.gov/api/procedures/v3/search"
        params = {
            terms: keyword
        }
        const response = await axios.get(url, { params });
        if ( response.status === 200 ) {
            const data = response.data;
            return data[3]  // gets the 3rd array which contains names of procedures
        } else {
            throw new Error("Failed to retrieve data from the API")
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getSuggestedProcedures
};