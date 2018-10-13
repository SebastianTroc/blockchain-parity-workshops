https://devmeetings.github.io/devmeeting-blockchain/

1. Pobierz i uruchom węzeł sieci `Parity 2.0.6-stable`

2. Zsynchronizuj się z siecią testową. Użyj tego pliku konfiguracyjnego.
```$ parity --chain=./chain.json --jsonrpc-cors=all --ws-origins=all```

3. Do Metamask zaimportuj konto na podstawie sekretu `e349ac9d1c914120282e49b3cc632c2cab71f86ab5602ab448b9ecf98930dbbd`. Powinieneś otrzymać adres `0x00a88fC3B3A86793De59c886e20B320A057a5723`

4. Prześlij sobie środki na swoje główne konto Metamask.
Zainstaluj i uruchom prosty Block Explorer. Dzięki niemu zobaczysz transakcje w sieci.

```
$ git clone --depth=1 -b built https://github.com/tomusdrw/etherdisplay
$ cd etherdisplay
$ npx live-server
```