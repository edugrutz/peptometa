import Sample from './models/Sample.js';
import fs from 'fs';

const jsonPath = './sra_titles.json'

const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

async function addItems() {

    const samples = await Sample.bulkCreate(jsonData);
    console.log('Bulk samples added:', samples.map(sample => sample.toJSON()));
}

addItems();