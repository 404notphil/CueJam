import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  ConfigureDrillState,
  loadDrillFailure,
  loadDrillSuccess,
  startLoading,
  writeDrillSuccess,
} from '../store/reducers/configureDrillReducer';
import {AppThunk} from '../store/store';
import {
  Drill,
  deleteDrillFailure,
  deleteDrillSuccess,
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
    const drillIdToWrite = getState().drillConfiguration.configuration.drillId;
    const name = getState().drillConfiguration.configuration.drillName;
    const configuration = JSON.stringify(
      getState().drillConfiguration.configuration,
    );
    console.log(
      '12345 configuration to save = ' + JSON.stringify(configuration),
    );

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
    const result = await db.executeSql(sql, params);

    console.log('12345 result = ' + JSON.stringify(result));
    // if (result[0].rowsAffected > 0) {
    dispatch(writeDrillSuccess(getState().drillConfiguration));
    dispatch(loadAllDrills());
    console.log('12345 saved');
    // } else {
    // dispatch(loadDrillFailure('Failed to save drill'));
    // console.log('12345 failed');
    // }
  } catch (error) {
    dispatch(loadDrillFailure('Failed to save drill'));
    console.log('12345 failed');
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
  }
};

export const loadDrillById =
  (drillId: number): AppThunk =>
  async dispatch => {
    dispatch(startLoading());
    try {
      const db = (await openDatabase()) as SQLiteDatabase;
      const results = await db.executeSql(
        'SELECT drillId, name, configuration FROM Drills WHERE drillId = ?',
        [drillId],
      );
      if (results[0].rows.length > 0) {
        const storeData = results[0].rows.item(0);
        console.log(
          '12345 read from db -> ' + JSON.stringify(results[0].rows.item(0)),
        );
        const configuration = JSON.parse(storeData.configuration);
        const drillState: ConfigureDrillState = {
          configuration: {...configuration, drillId: drillId},
          isSaved: true,
          isLoading: false,
        };
        dispatch(loadDrillSuccess(drillState));
        console.log('12345 success');
      } else {
        console.log('12345 failure');
        dispatch(loadDrillFailure('No drill found with the given name'));
      }
    } catch (error) {
      console.log('12345 failure');
      dispatch(loadDrillFailure('Failed to load drill'));
    }
  };

export const deleteDrillById =
  (drillId: number): AppThunk =>
  async dispatch => {
    try {
      const db = (await openDatabase()) as SQLiteDatabase;
      const results = await db.executeSql(
        'DELETE FROM Drills WHERE drillId = ?',
        [drillId],
      );
      if (results[0].rows.length > 0) {
        const storeData = results[0].rows.item(0);
        const state: ConfigureDrillState = JSON.parse(storeData.configuration);
        state.configuration.drillId = storeData.drillId;
        dispatch(deleteDrillSuccess(state));
      } else {
        dispatch(deleteDrillFailure('Failed to delete drill'));
      }
    } catch (error) {
      dispatch(deleteDrillFailure('Failed to delete drill'));
    }
  };

export const fetchDrill =
  (drillId: string): AppThunk =>
  async (dispatch, getState) => {};