const fs = require('fs/promises');
const path = require('path');

const TALKERS_DATA_PATH = '../talker.json';

function getNewId(talkers) {
  return talkers.reduce((id, curr) => (Number(curr.id) > Number(id) && curr.id), 0) + 1;
}

async function readTalkersData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKERS_DATA_PATH));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(error.message);
  }
}

async function writeTalkersData(newTalker) {
  try {
    const talkers = await readTalkersData();
    const id = getNewId(talkers);
    const newTalkerWithId = { id, ...newTalker };
    const updatedTalkers = JSON.stringify([...talkers, newTalkerWithId]);
    await fs.writeFile(path.resolve(__dirname, TALKERS_DATA_PATH), updatedTalkers);
    return newTalkerWithId;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { 
  readTalkersData, 
  writeTalkersData, 
};