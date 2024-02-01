# NestJS HTTP Forwarding Server
Server, progettato con il framework Nest.js, dedicato sull'HTTP proxy forwarding (inoltro di richieste e risposte HTTP) per un singolo dominio. Evoluzione del progetto 'Simple HTTP Forwarding Server for Single Domain', integra funzionalità avanzate come la memorizzazione nella cache, TypeORM e SQLite per uno storage efficiente di richieste e risposte. Offrendo un'esplorazione pratica della comunicazione HTTP e dell'ottimizzazione dei dati, fornisce una soluzione completa per gli sviluppatori che cercano un approccio sofisticato alla gestione delle richieste.

[![Nest.js Version](https://img.shields.io/badge/-NestJs-ea2845?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18.15.0-green)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/npm/v/npm?color=green)](https://www.npmjs.com)
[![Express.js Version](https://img.shields.io/badge/Express.js-v4.18.2-green)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=green)](LICENSE.md)

## Descrizione
Server specializzato nell'inoltro di richieste e risposte HTTP attraverso un proxy per un dominio specifico, sviluppato con l'obiettivo di ottimizzare l'efficienza e la gestione delle risposte mantenendo un focus sull'aumento delle funzionalità senza sacrificare chiarezza e semplicità di implementazione. Inizialmente concepito come risorsa educativa, il progetto evolve dal "Simple HTTP Forwarding Server for Single Domain", incorpora le capacità offerte dal framework Nest.js. Integrando funzionalità avanzate come la memorizzazione nella cache attraverso TypeORM e SQLite e la gestione delle richieste del proxy con middleware, il server mira a ottimizzare la gestione delle risposte e l'efficienza.
Seguendo la filosofia di progettazione KISS (Keep It Simple, Stupid), il progetto promuove semplicità e chiarezza nel codice. L'adozione di Nest.js fornisce una struttura organizzata, capacità di iniezione delle dipendenze, decoratori, semplificando la gestione modulare di controller, servizi, componenti, modello dati e repository di entità.
Il server offre supporto per la compilazione in diversi ambienti, garantendo flessibilità e adattabilità alle esigenze di sviluppo. Il sistema di logging completo facilita il monitoraggio e il debugging, contribuendo a una gestione approfondita delle richieste e delle risposte. Diversi servizi REST API sono disponibili per la gestione dinamica delle richieste e delle risposte memorizzate nella cache, consentendo interrogazioni dinamiche dei dati memorizzati.
Esplora appieno le capacità di questo server, progettato per un avanzato inoltro delle richieste HTTP con un approccio pratico e didattico.

## Funzionalità Principali
- Riceve richieste HTTP dai client.
- Inoltra richieste HTTP a un server di destinazione configurato.
- Modifica gli header delle richieste, se necessario.
- Riceve e gestisce risposte dal server di destinazione.
- Implementa una memorizzazione avanzata utilizzando TypeORM e SQLite per memorizzare richieste e risposte.
- Middleware per la gestione delle richieste del proxy durante l'inoltro.
- Inoltra le risposte ai client.
- Supporto per la compilazione in diversi ambienti.
- Sistema di logging completo.
- Servizi REST API per la gestione delle richieste e delle risposte memorizzate.

## Traduzioni del Readme
- [Read in English.](README.md)
- [Leggi in Italiano.](README.it.md)

## Requisiti
- Node.js e npm installati sul tuo sistema.

## Installazione e Utilizzo
1. Clona questo repository sul tuo computer.
2. Installa le dipendenze del progetto usando npm:
```shell
npm install
```
3. Configura le impostazioni di inoltro delle richieste HTTP nel file di configurazione dell'ambiente: 'src/environments/dev.env' (default).
4. Avvia il server con il seguente comando:
```shell
npm start
```
5. Il server ascolterà le richieste dei client e le inoltrerà al server di destinazione.

## Configurazione
Puoi personalizzare il comportamento del server modificando il file di configurazione dell'ambiente: 'src/environments/dev.env' (default).
NOTA: per gli utenti Windows, è necessario installare il pacchetto cross-env, poiché Windows non supporta questo modo di caricare variabili, e modificare i comandi come segue "start:dev": "cross-env NODE_ENV=dev nest start --watch"

## Autore
* Nome: Marco (Hocram) Di Pasquale
* Profilo GitHub: [Hocram](https://github.com/hocram) (https://github.com/hocram)

## Contatti
Per domande, segnalazioni di bug o suggerimenti, puoi contattarci attraverso il sistema di tracciamento problemi di GitHub:
- [Apri una nuova issue](https://github.com/hocram/node-nestjs-http-forwarding-server/issues/new) per segnalare problemi o proporre miglioramenti.
- Consulta le [Linee Guida per le Issue](https://github.com/hocram/node-nestjs-http-forwarding-server/blob/main/ISSUE_GUIDELINES.md) prima di aprire una nuova issue.

## Licenza
Questo progetto è distribuito con licenza [MIT](LICENSE), Copyright (c) 2023 - Autore Marco Di Pasquale (Hocram).
Consulta il file [LICENSE](LICENSE) per ulteriori dettagli.

## Thank You!
Un grande ringraziamento a tutti coloro che contribuiranno a perfezionare questo progetto. Le tue future contribuzioni saranno molto apprezzate e contribuiranno a rendere ancora migliore questa risorsa educativa, mantenendo sempre presente la metodologia di progettazione KISS (Keep It Simple, Stupid): cercando di mantenere semplicità, chiarezza e priva di complicazioni.

Buon codice e buono studio! :smile:

Hocram