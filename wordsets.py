import os
import json

WORD_SETS: dict[str, list[str]] = {}

with open(os.path.join('words', 'words.json'), 'r', encoding='utf-8') as f:
    all_sets = json.load(f)

for word_set in all_sets:
    with open(os.path.join('words', word_set['file']), 'r', encoding='utf-8') as f:
        WORD_SETS[word_set['name']] = f.read().splitlines()

