from __future__ import annotations
import random
import time
import threading
import wordsets

LOBBY_TTL = 3600

def get_lobby(lobby_id: int) -> Lobby:
    if lobby_id not in Lobby._all_lobbies:
        Lobby._all_lobbies[lobby_id] = Lobby(lobby_id)
    return Lobby._all_lobbies[lobby_id]

class Lobby:
    _all_lobbies: dict[int, Lobby] = {}
    def __init__(self, lobby_id: int) -> None:
        self.lobby_id: int = lobby_id
        self.players: list[str] = []
        self.chameleon: str = ''
        self.last_chameleon: str = ''
        self.current_word = ''
        self.game_started = False
        self.categories: set[str] = set()

        self.last_ping = time.time()

    @staticmethod
    def get_status(lobby_id: int, player: str):
        if player not in get_lobby(lobby_id).players:
            get_lobby(lobby_id).players.append(player)

        is_chameleon = (player in get_lobby(lobby_id).chameleon)

        return {
        'players': get_lobby(lobby_id).players,
        'started': get_lobby(lobby_id).game_started,
        'is_chameleon': is_chameleon,
        'word': None if is_chameleon else get_lobby(lobby_id).current_word
    }

    @staticmethod
    def start(lobby_id: int) -> bool:
        if get_lobby(lobby_id).game_started:
            return False
        
        if len(get_lobby(lobby_id).players) < 3:
            print(get_lobby(lobby_id).players)
            return False
        
        get_lobby(lobby_id).current_word = random.choice([word for wordset_name, wordset in wordsets.WORD_SETS.items() for word in wordset if wordset_name in get_lobby(lobby_id).categories])
        
        get_lobby(lobby_id).chameleon = random.choice([player for player in get_lobby(lobby_id).players if player != get_lobby(lobby_id).last_chameleon])
        get_lobby(lobby_id).last_chameleon = get_lobby(lobby_id).chameleon

        get_lobby(lobby_id).current_word

        get_lobby(lobby_id).game_started = True

        get_lobby(lobby_id).last_ping = time.time()

        return True

    @staticmethod
    def set_category(lobby_id: int, category: str, set_to: bool):
        if set_to:
            get_lobby(lobby_id).categories.add(category)
        else:
            get_lobby(lobby_id).categories.remove(category)

    @staticmethod
    def get_categories(lobby_id: int):
        return list(get_lobby(lobby_id).categories)
    
    @staticmethod
    def reset(lobby_id: int):
        get_lobby(lobby_id).players = []
        get_lobby(lobby_id).game_started = False

        return get_lobby(lobby_id).chameleon
        
def _lobby_killer():
    while True:
        time.sleep(LOBBY_TTL)
        
        for lobby in list(Lobby._all_lobbies.values()):
            if lobby.last_ping + LOBBY_TTL < time.time():
                Lobby._all_lobbies.pop(lobby.lobby_id)

threading.Thread(target=_lobby_killer, daemon=True).start()
