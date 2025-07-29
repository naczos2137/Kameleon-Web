# **Gra przeglądarkowa Kameleon**
## Przygotowanie do gry przez LAN:
By zagrać potrzeba:
- Pobierz projekt
- W `hasla.txt` możesz ustawić własne hasła (albo poprosić chata-gpt by wypisał linijka po linijce hasła w wybranej tematyce)
- W `main.py` na górze możesz ustawić ilość kameleonów w ```CHAMELEON_AMOUNT = 1```
- Upewnij się, że masz Pythona 3
- Pobierz flask
```pip install Flask```
- Podłącz urządzenie do sieci LAN (najczęściej po prostu do sieci wifi)
- Uruchom `main.py`
```python3 main.py```
- W konsoli pojawią się 2 adresy IP. Jeden 127.0.0.1:5000 (localhost) i lokalny adres (coś typu `192.168.1.100:5000)
- Każdy z graczy na telefonie (lub innym urządzeniu) niech podłączy się do tej samej sieci (wifi) i w przeglądarce wpisze adres lokalny z punktu wyżej. Jeśli jakiś gracz gra na urządzeniu gdzie jest hostowane niech użyje `127.0.0.1:5000`
- Jeden gracz, który będzie kontrolował rozgrywkę niech otworzy podstrone `/admin` czyli np. `192.168.1.100:5000/admin` lub na urządzaniu hostującym `127.0.0.1:5000/admin`
## Jak grać:
- Po dołączeniu i wybraniu nicków przez wszystkich graczy admin startuje rozgrywkę.
- Każdy z graczy poza 1 poznaje hasło, a 1 gracz dostaje informacje, że jest kameleonem
- Po kolei każdy z graczy mówi jakieś skojarzenie z hasłem. Musi być na tyle bliskie by inni gracze znający hasło wiedzieli, że również je znasz, ale na tyle dalekie by Kameleon nie poznał hasła
- Gdy będzie tura Kameleona to musi on udawać, że zna hasło i też podać jakieś skojarzenie
- Po całej kolejce gracze głosują na to kto był Kameleonem (nie znał hasła)
- Jeśli nie wygłosują Kameleona to on wygrywa. Jeśli wygłosują to ma on ostatnią szansę: zgaduje jakie było hasło
- Jeśli zgadnie to i tak wygrywa, a jeśli nie to przegrywa
## Możliwe problemy i inne info:
- Jeśli gracz ustawi nazwę, a następnie wyjdzie ze strony to nadal będzie liczony jako gracz aż do następonej tury
- Można dołączać w trakcje gry (nie będzie się wtedy kameleonem)
- Jeśli port 5000 jest zablokowany/już używany należy w `main.py` pod koniec w ```app.run(host='0.0.0.0', port=5000, debug=False)``` zmienić `5000` na inną liczbę (może być 5001 etc.)
- Jeśli 2 osoby wejdą z tym samym nickiem to będą liczone jako 1 gracz (tzn będą widzieć na telefonie to samo)
- Jeśli widzisz, że pojawiają ci się rzeczy na ekranie z opóźnieniem do 3 sekund to jest to zamierzony efekt. By gra działała nawet przy słabym ruterze z wieloma graczami na raz nie tworzy stałych połączeń WebSocket tylko każdy z graczy co 3 sekundy prosi serwer o aktualny stan gry. Opóźnienie do 3 sekund realnie nie wpływa w żaden niegatywny sposób na rozgrywkę.
  
