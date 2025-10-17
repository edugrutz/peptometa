import Sample from './models/Sample.js';

async function addItems() {
    await Sample.create({
        name: 'Sample 1',
        description: 'This is the first sample',
        sra_accession: 'SRR123456'
    }).then(sample => {
        console.log('Sample added:', sample.toJSON());
    }).catch(error => {
        console.error('Error adding sample:', error);
    });
}

addItems();