
def is_compatible(dhatu_group, vocab_ending):
    # Logic ported from TananuntoRootsPage.js
    
    if vocab_ending == "o" and "โอ" not in dhatu_group:
        return False
    if (vocab_ending == "e" or vocab_ending == "aya") and "เณ" not in dhatu_group:
        return False
    if vocab_ending == "ṇā" and ("ณุ" not in dhatu_group and "นา" not in dhatu_group):
        return False
    
    if vocab_ending == "a":
        # Strict exclusion: If root is Tan/Cur/Ki/Su, 'a' ending is likely wrong
        if "โอ" in dhatu_group or "เณ" in dhatu_group or "นา" in dhatu_group or "ณุ" in dhatu_group:
            return False
            
    return True

# Test Cases
test_cases = [
    # DPD word: karoti (o), Our Dict: Tan (โอ) -> Should Pass
    {"dhatu_group": "ตน (โอ)", "vocab_ending": "o", "expected": True, "desc": "karoti (o) vs Tan (O)"},
    
    # DPD word: karoti (o), Our Dict: Bhu (อ) -> Should Fail
    {"dhatu_group": "ภู (อ)", "vocab_ending": "o", "expected": False, "desc": "karoti (o) vs Bhu (A)"},
    
    # DPD word: deseti (e), Our Dict: Cur (เณ) -> Should Pass
    {"dhatu_group": "จุร (เณ)", "vocab_ending": "e", "expected": True, "desc": "deseti (e) vs Cur (Ne)"},
    
    # DPD word: deseti (e), Our Dict: Tan (โอ) -> Should Fail
    {"dhatu_group": "ตน (โอ)", "vocab_ending": "e", "expected": False, "desc": "deseti (e) vs Tan (O)"},
    
    # DPD word: agghati (a), Our Dict: Bhu (อ) -> Should Pass
    {"dhatu_group": "ภู (อ)", "vocab_ending": "a", "expected": True, "desc": "agghati (a) vs Bhu (A)"},
    
    # DPD word: agghati (a), Our Dict: Tan (โอ) -> Should Fail
    {"dhatu_group": "ตน (โอ)", "vocab_ending": "a", "expected": False, "desc": "agghati (a) vs Tan (O)"},
    
    # DPD word: suṇāti (ṇā), Our Dict: Su (ณุ) -> Should Pass
    {"dhatu_group": "สุ (ณุ)", "vocab_ending": "ṇā", "expected": True, "desc": "suṇāti (ṇā) vs Su (Nu)"},
    
    # DPD word: suṇāti (ṇā), Our Dict: Ki (นา) -> Should Pass
    {"dhatu_group": "กี (นา)", "vocab_ending": "ṇā", "expected": True, "desc": "suṇāti (ṇā) vs Ki (Na)"},
    
    # DPD word: suṇāti (ṇā), Our Dict: Bhu (อ) -> Should Fail
    {"dhatu_group": "ภู (อ)", "vocab_ending": "ṇā", "expected": False, "desc": "suṇāti (ṇā) vs Bhu (A)"},
]

print("--- Testing Compatibility Logic ---")
all_passed = True
for case in test_cases:
    result = is_compatible(case["dhatu_group"], case["vocab_ending"])
    status = "PASS" if result == case["expected"] else "FAIL"
    if status == "FAIL": all_passed = False
    print(f"Test: {case['desc']} | Group: {case['dhatu_group']} | Ending: {case['vocab_ending']} -> Result: {result} ({status})")

if all_passed:
    print("\nAll tests passed! Logic confirms strict matching against Our Dictionary.")
else:
    print("\nSome tests failed.")
