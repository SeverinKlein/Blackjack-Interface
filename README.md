# Blackjack-Kladde

Ein Zettel für den Schreiberling der Blackjack-Runde: Einsätze setzen, Ergebnisse abhaken,
Kontostände mitführen und am Ende sehen, wer wem was zahlt.

Eine einzige HTML-Datei, kein Server, keine Bibliotheken, kein Konto. Läuft im Browser,
lässt sich als App auf den Home-Bildschirm legen und funktioniert danach auch ohne Netz.

![Icon](icon-192.png)

## Funktionen

**Runde erfassen**

- Einsatz pro Spieler in frei wählbaren Schritten, dazu Schnellwerte von 0,50 € bis 10 €
- Ergebnisse: Gewinn, Push, Verlust, Blackjack, Aufgabe
- Double down, Split bis zu vier Händen, Versicherung
- Ein Klick für den ganzen Tisch: Dealer überkauft, Dealer gewinnt, alles Push
- Live-Vorschau, was die Runde für jeden bedeutet, bevor sie gebucht wird

**Tisch verwalten**

- Spieler aufnehmen, umbenennen, pausieren, entfernen
- Reihenfolge mit Pfeilen ändern, passend zur Sitzordnung
- Bank wahlweise als Haus, als rotierender Spieler-Dealer oder gar nicht

**Kasse**

- Kontostand, Einkauf und Auszahlung je Spieler
- Handstatistik: gewonnen, verloren, Push, Blackjacks
- Einkäufe buchen und Salden von Hand korrigieren
- Ausgleich mit möglichst wenigen Zahlungen, dazu ein Textexport zum Verschicken

**Verlauf**

- Jede Runde, jeder Einkauf, jede Korrektur mit Uhrzeit
- Letzter Eintrag lässt sich vollständig zurücknehmen, inklusive Dealerwechsel

**Einstellungen** (Zahnrad oben rechts)

- Sprache der Oberfläche: Deutsch oder Englisch, inklusive Zahlen- und Datumsformat
- Blackjack zahlt 3:2, 6:5 oder 2:1
- Schrittweite 0,25 €, 0,50 € oder 1,00 €
- Aufgabe und Versicherung abschaltbar
- Einsätze nach der Runde behalten oder zurücksetzen
- Farben: Filzgrün oder heller Modus

## Rechenregeln

Alle Beträge werden intern in Cent gerechnet, es gibt also keine Rundungsfehler.
`E` ist der Einsatz der Hand.

| Ergebnis | Buchung |
| --- | --- |
| Gewinn | `+E`, mit Double `+2E` |
| Blackjack | `+1,5 × E` (je nach Einstellung `+1,2 × E` oder `+2 × E`) |
| Push | `0` |
| Verlust | `−E`, mit Double `−2E` |
| Aufgabe | `−E / 2` |
| Versicherung | Einsatz `E / 2`, zahlt 2:1, also `+E` bei Dealer-Blackjack, sonst `−E / 2` |

Die Bank bekommt die Gegenbuchung der Summe aller Spieler, damit die Kasse am Ende aufgeht.

## Selbst hosten mit GitHub Pages

1. Repository anlegen, **Public**, zum Beispiel `kladde`.
2. Alle Dateien dieses Ordners hochladen (`index.html`, `manifest.webmanifest`, `sw.js`, die vier Icons, `.nojekyll`).
3. **Settings → Pages**, unter *Source* **Deploy from a branch**, Branch `main`, Ordner `/ (root)`, speichern.
4. Nach ein bis zwei Minuten liegt die Kladde unter `https://DEINNAME.github.io/kladde/`.

Alternativ per Kommandozeile:

```bash
git clone https://github.com/DEINNAME/kladde.git
cd kladde
# Dateien hineinkopieren
git add .
git commit -m "Blackjack-Kladde als statische Seite"
git push
```

## Auf dem Handy installieren

- **iPhone:** Adresse in Safari öffnen, Teilen-Symbol, *Zum Home-Bildschirm*. Startet als Vollbild-App.
- **Android:** Adresse in Chrome öffnen, Menü, *App installieren*.

Lokal geöffnete Dateien (`file://`) funktionieren am Rechner, auf dem iPhone jedoch nicht:
Safari kann dort keine lokalen Dateien ausführen, und die Vorschau der Dateien-App startet
kein JavaScript. Deshalb der Umweg über Pages.

## Wo die Daten liegen

Die Stände bleiben im lokalen Speicher des jeweiligen Browsers, sie werden nirgends
hochgeladen. Daraus folgt:

- Jedes Gerät führt seine eigene Kladde, es gibt keine Synchronisierung.
- Privates Fenster oder gelöschte Browserdaten bedeuten eine leere Kladde.
- Für die Abrechnung am Ende des Abends den Textexport unter *Kasse* nutzen.

Ist gar kein Speicher verfügbar, läuft alles trotzdem, nur eben bis zum Schließen des
Tabs. Unter *Regeln → Speicher* steht, was gerade gilt.

## Aktualisieren

Nach jeder Änderung an `index.html` in `sw.js` die Zeile `const VERSION = 'kladde-v2';`
hochzählen. Sonst behalten bereits installierte Geräte die alte Fassung aus dem Cache.

## Anpassen

Alle Oberflächentexte liegen im Objekt `TEXTE` im Skriptteil von `index.html`, je ein Block
für Deutsch und Englisch. Weitere Sprachen lassen sich dort als zusätzlicher Block ergänzen.

Farben, Abstände und Schriften stecken in den CSS-Variablen ganz oben in `index.html`,
sowohl für das dunkle als auch für das helle Thema. Die Chipfarben der Salden-Anzeige
liegen in der Liste `WERTE` im Skriptteil, dort lassen sich auch andere Stückelungen
eintragen.

## Aufbau

```
index.html               komplette App, Aufbau, Gestaltung und Logik
manifest.webmanifest     Name, Farben und Icons für die Installation
sw.js                    Service Worker für den Offline-Betrieb
icon-*.png               App-Icons
.nojekyll                sagt GitHub Pages, dass nichts vorverarbeitet werden soll
```

## Browser

Getestet gegen aktuelle Fassungen von Safari, Chrome und Firefox. Der Offline-Betrieb
braucht eine https-Adresse, über GitHub Pages ist das automatisch gegeben.

## Lizenz

MIT, siehe [LICENSE](LICENSE).
