import React, { useState, useEffect, useMemo, useCallback } from "react";
import flureedb from "@fluree/flureedb";

function useFluree(ledgerAlias, connOptions) {
  const [conn, setConn] = useState();
  const [ledger, setLedger] = useState();
  const [stagedDb, setStagedDb] = useState();
  const [committedDb, setCommittedDb] = useState();
  // const [message, setMessage] = useState("");

  const connect = useCallback(
    async (options) => {
      try {
        if (!conn) {
          const newConn = await flureedb.jldConnect(options);
          setConn(newConn);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [conn]
  );

  useEffect(() => {
    if (!conn) {
      connect(connOptions);
    }
  }, [conn, connect, connOptions]);

  const create = useCallback(
    async (ledgerAlias) => {
      try {
        const newLedger = await flureedb.jldCreate(conn, ledgerAlias);
        if (newLedger) {
          console.log("ledger created", newLedger);
          setLedger(newLedger);
        } else throw new Error(`There was a problem creating ${ledgerAlias}`);
      } catch (err) {
        console.error(err);
      }
    },
    [conn]
  );

  useEffect(() => {
    if (conn && !ledger) {
      create(ledgerAlias);
    }
  }, [conn, ledgerAlias, ledger, create]);

  /**
   *
   * @param {object} conn Fluree connection object
   * @param {object} db Fluree db object
   * @returns
   */
  const commit = async (conn, db) => {
    try {
      const committed = await flureedb.jldCommit(conn, db);
      if (committed) {
        console.log("committed", committed);
        const db = await flureedb.jldDb(ledger);
        setCommittedDb(db);
        return committed;
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param {object} ledger
   * @param {object} stageData
   * @returns a db object
   */
  const stage = async (ledger, stageData) => {
    try {
      let data;
      if (typeof stageData === "string") data = JSON.parse(stageData);
      else data = stageData;
      if (ledger) {
        const staged = await flureedb.jldStage(ledger, data);
        if (staged) {
          setStagedDb(staged);
          console.log("staged", staged);
          return staged;
        }
      } else throw new Error("Create a new ledger first");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param {object} db
   * @param {object} q
   * @returns an array of records (if present and applicable), or an error message
   */
  const query = async (db, q) => {
    try {
      let queryObject;
      if (typeof q === "string") queryObject = JSON.parse(q);
      else queryObject = q;
      const results = await flureedb.jldQuery(db, queryObject);
      return results;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  return {
    conn,
    ledger,
    stagedDb,
    committedDb,
    stage,
    commit,
    query,
  };
}

export default useFluree;
