import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  ConfigureDrillState,
  loadDrillFailure,
  loadDrillSuccess,
  writeDrillSuccess,
} from '../store/reducers/configureDrillReducer';
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
      'CREATE TABLE IF NOT EXISTS Drills(drillId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, configuration TEXT)',
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
      'INSERT INTO Sessions (id, timestamp, data) VALUES (?, ?, ?)',
      [drillId, timestamp, data],
    );
  } catch (error) {
    console.error(error);
  }
};

export const saveDrill = (): AppThunk => async (dispatch, getState) => {
  try {
    const db = (await openDatabase()) as SQLiteDatabase;
    const drillIdToWrite = getState().drillConfiguration.drillId;
    const name = getState().drillConfiguration.drillName;
    const configuration = JSON.stringify(getState().drillConfiguration);

    let sql = '';
    let params = [];

    if (typeof drillIdToWrite === 'number') {
      // If drillIdToWrite is defined and a number, include it in the query
      sql =
        'REPLACE INTO Drills (drillId, name, configuration) VALUES (?, ?, ?)';
      params = [drillIdToWrite, name, configuration];
    } else {
      // If drillIdToWrite is undefined, omit it from the query to trigger auto-increment
      sql = 'INSERT INTO Drills (name, configuration) VALUES (?, ?)';
      params = [name, configuration];
    }
    await db.executeSql(sql, params);
    dispatch(writeDrillSuccess(getState().drillConfiguration)); // Dispatching on success
    dispatch(loadAllDrills());
  } catch (error) {
    console.error('Failed to save drill:', error);
  }
};

export const loadAllDrills = (): AppThunk => async dispatch => {
  try {
    dispatch(loadStart());
    const db = (await openDatabase()) as SQLiteDatabase;
    const results = await db.executeSql(
      'SELECT drillId, name, configuration FROM Drills',
    );
    let drills: Drill[] = [];
    let rows = results[0].rows;
    for (let i = 0; i < rows.length; i++) {
      drills.push(rows.item(i));
    }
    dispatch(loadSuccess(drills));
  } catch (error) {
    dispatch(loadFailure('Failed to load drills'));
    console.log('Failed to load drills:', error);
  }
};

export const loadDrillById =
  (drillId: number): AppThunk =>
  async dispatch => {
    try {
      const db = (await openDatabase()) as SQLiteDatabase;
      const results = await db.executeSql(
        'SELECT drillId, name, configuration FROM Drills WHERE drillId = ?',
        [drillId],
      );
      if (results[0].rows.length > 0) {
        const storeData = results[0].rows.item(0);
        const drill: ConfigureDrillState = JSON.parse(storeData.configuration);
        drill.drillId = storeData.drillId;
        dispatch(loadDrillSuccess(drill));
      } else {
        dispatch(loadDrillFailure('No drill found with the given name'));
      }
    } catch (error) {
      dispatch(loadDrillFailure('Failed to load drill'));
    }
  };

export const fetchDrill =
  (drillId: string): AppThunk =>
  async (dispatch, getState) => {};