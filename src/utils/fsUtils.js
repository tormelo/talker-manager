const fs = require('fs/promises');
const path = require('path');

const TALKERS_DATA_PATH = path.resolve(__dirname, '../talker.json');

function getNewId(talkers) {
  return talkers.reduce((id, curr) => (Number(curr.id) > id && Number(curr.id)), 0) + 1;
}

async function readTalkersData() {
  try {
    const data = await fs.readFile(TALKERS_DATA_PATH);
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(error.message);
  }
}

async function writeTalkersData(newTalker) {
  try {
    const talkers = await readTalkersData();
    const newTalkerWithId = { id: getNewId(talkers), ...newTalker };
    const updatedTalkers = [...talkers, newTalkerWithId];
    await fs.writeFile(TALKERS_DATA_PATH, JSON.stringify(updatedTalkers));
    return newTalkerWithId;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateTalkerData(id, newData) {
  try {
    const talkers = await readTalkersData();
    const updatedTalker = { id, ...newData };
    const updatedTalkers = talkers
      .map((talker) => (talker.id === id ? updatedTalker : talker));
    await fs.writeFile(TALKERS_DATA_PATH, JSON.stringify(updatedTalkers));
    return updatedTalker;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { 
  readTalkersData, 
  writeTalkersData, 
  updateTalkerData,
};