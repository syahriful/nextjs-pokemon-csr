/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  // since this is a list page so we want to have an array of the pokemon
  const [pokemon, setPokemon] = useState([]);

  // use useEffect but only on startup so we'll give it an empty dependency
  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
      // set pokemon to the json version
      setPokemon(await resp.json());
    }
    getPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CSR Pokemon List</title>
      </Head>
      <h2>CSR Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
