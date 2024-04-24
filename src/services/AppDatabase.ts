import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const openDatabase = async (): Promise<SQLiteDatabase | undefined> => {
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

// Usage
const dbUsage = async () => {
  const db = await openDatabase();
  if (db) {
    await addDrill(
      db,
      'Sample Drill',
      JSON.stringify({steps: 10, level: 'beginner'}),
    );
    await addSession(db, 1, JSON.stringify({score: 200, duration: 3600}));
  }
};

dbUsage();
