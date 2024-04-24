import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {writeDrillSuccess} from '../store/reducers/configureDrillReducer';
import {AppThunk} from '../store/store';
import {
  Drill,
  loadFailure,
  loadStart,
  loadSuccess,
} from '../store/reducers/allDrillsSlice';

SQLite.enablePromise(true);

const openDatabase = async (): Promise<SQLite.SQLiteDatabase | undefined> => {
  try {
    const db = (await SQLite.openDatabase({
      name: 'app.db',
      location: 'default',
    })) as SQLiteDatabase;
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS Drills(name TEXT PRIMARY KEY, configuration TEXT)',
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

export const loadAllDrills = (): AppThunk => async dispatch => {
  try {
    dispatch(loadStart());
    const db = (await openDatabase()) as SQLiteDatabase;
    const results = await db.executeSql(
      'SELECT name, configuration FROM Drills',
    );
    let drills: Drill[] = [];
    let rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) {
      drills.push(rows.item(i));
    }
    console.log('12345  drills -> ' + drills);
    dispatch(loadSuccess(drills));
  } catch (error) {
    dispatch(loadFailure('Failed to load drills'));
    console.log('12345 Failed to load drills:', error);
  }
};

export const loadDrillByName =
  (drillName: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(loadStart());
      const db = (await openDatabase()) as SQLiteDatabase;
      const results = await db.executeSql(
        'SELECT name, configuration FROM Drills WHERE name = ?',
        [drillName],
      );
      if (results[0].rows.length > 0) {
        dispatch(loadSuccess([results[0].rows.item(0)])); // Dispatch as an array for consistency
      } else {
        dispatch(loadFailure('No drill found with the given ID'));
      }
    } catch (error) {
      dispatch(loadFailure('Failed to load drill'));
      console.error('Failed to load drill:', error);
    }
  };

export const fetchDrill =
  (drillId: string): AppThunk =>
  async (dispatch, getState) => {};