import pool from "./Pool";
import { resultPG } from "./types";

export let get = async (table: string, values: string[], filters: string) => {
  let result: resultPG = { data: undefined, error: undefined };

  try {
    const client = await pool.connect();
    let listValues = '';
    values.forEach((value) => { listValues === '' ? listValues += `${value}` : listValues += `,${value}` });

    let sql = `SELECT ${listValues} FROM ${table}`;

    sql != null ? sql += ` WHERE ${filters}` : sql;

    console.log(sql);

    const { rows } = await client.query(sql);
    result.data = rows;
    console.log(rows);

    client.release();

    return result;
  } catch (error) {
    console.log(error);
    result.error = error;
    return result;
  }
}

export let insert = async (columns: string[], values: string[], table: string) => {
  let result: resultPG = { data: undefined, error: undefined };

  try {
    const client = await pool.connect();
    let listColumns = '';
    let listValues = '';
    
    columns.forEach((column) => { listColumns === '' ? listColumns += `${column}` : listColumns += `,${column}`});
    values.forEach((value) => { listValues === '' ? listValues += `${value}` : listValues += `,${value}` });

    let sql = `INSERT INTO ${table}(${listColumns})VALUES(${listValues})`;

    const { rows } = await client.query(sql);
    result.data = rows;

    client.release();

    return result;
  } catch (error) {
    result.error = error;
    return result;
  }
}

export let update = async (table: string, values: Map<String, any>, filters: string) => {
  let result: resultPG = { data: undefined, error: undefined };

  try {
    const client = await pool.connect();
    let listValues = '';

    values.forEach((key, value) => { listValues === '' ? listValues += `${key} = ${value}` : listValues += `,${key} = ${value}` });

    let sql = `UPDATE ${table} SET ${listValues} WHERE ${filters})`;

    const { rows } = await client.query(sql);
    result.data = rows;

    client.release();

    return result;
  } catch (error) {
    result.error = error;
    return result;
  }
}