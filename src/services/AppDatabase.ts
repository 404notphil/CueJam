import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  ConfigureDrillState,
  writeDrillSuccess,
} from '../store/reducers/configureDrillReducer';
import {AppThunk} from '../store/store';

SQLite.enablePromise(true);

const openDatabase = async (): Promise<SQLite.SQLiteDatabase | undefined> => {
  try {
    const db = (await SQLite.openDatabase({
      name: 'app.db',
      location: 'default',
    })) as SQLiteDatabase;
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS Drills(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, configuration TEXT)',
    );
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS Sessions(id INTEGER PRIMARY KEY AUTOINCREMENT, drillId INTEGER, timestamp DATETIME, data TEXT, FOREIGN KEY(drillId) REFERENCES Drills(id))',
    );
    return db;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const addDrill = async (
  db: SQLiteDatabase,
  name: string,
  configuration: string,
) => {
  try {
    await db.executeSql(
      'INSERT INTO Drills (name, configuration) VALUES (?, ?)',
      [name, configuration],
    );
  } catch (error) {
    console.error(error);
  }
};

const addSession = async (
  db: SQLiteDatabase,
  drillId: number,
  data: string,
) => {
  try {
    const timestamp = new Date().toISOString();
    await db.executeSql(
      'INSERT INTO Sessions (drillId, timestamp, data) VALUES (?, ?, ?)',
      [drillId, timestamp, data],
    );
  } catch (error) {
    console.error(error);
  }
};

export const saveDrill = (): AppThunk => async (dispatch, getState) => {
  try {
    const db = (await openDatabase()) as SQLiteDatabase;
    const result = await db.executeSql(
      'INSERT INTO Drills (name, configuration) VALUES (?, ?)',
      [getState().drillConfiguration.drillName, JSON.stringify(getState())],
    );
    if (result[0].rowsAffected > 0) {
      dispatch(writeDrillSuccess(getState().drillConfiguration)); // Dispatching on success
      console.log('12345 succeeded in writing drill');
    }
  } catch (error) {
    console.error('12345 Failed to save drill:', error);
  }
};

const fetchAllDrills = async (): Promise<any[]> => {
  try {
    const db = await SQLite.openDatabase({name: 'app.db', location: 'default'});
    const results = await db.executeSql(
      'SELECT id, name, configuration FROM Drills',
    );
    let drills = [];
    let rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) {
      drills.push(rows.item(i));
    }
    return drills;
  } catch (error) {
    console.error('Failed to fetch drills:', error);
    return []; // Return an empty array in case of error
  }
};

const fetchDrillById = async (drillId: number): Promise<any> => {
  try {
    const db = await SQLite.openDatabase({name: 'app.db', location: 'default'});
    const results = await db.executeSql(
      'SELECT id, name, configuration FROM Drills WHERE id = ?',
      [drillId],
    );
    if (results[0].rows.length > 0) {
      return results[0].rows.item(0); // Return the first (and should be only) row
    } else {
      console.log('No drill found with the given ID:', drillId);
      return null; // Return null if no drill is found
    }
  } catch (error) {
    console.error('Failed to fetch drill:', error);
    return null; // Return null in case of error
  }
};

export const fetchDrill =
  (drillId: string): AppThunk =>
  async (dispatch, getState) => {};