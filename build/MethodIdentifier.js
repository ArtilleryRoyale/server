"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugIntToObject = exports.debugIntToMethod = exports.debugStringToMessage = void 0;
function debugStringToMessage(s) {
    if (s == "r")
        return "NETWORK_MESSAGE_ROUND_READY";
    if (s == "s")
        return "NETWORK_MESSAGE_WAIT_FOR_SWITCH";
    if (s == "t")
        return "NETWORK_MESSAGE_SWITCH_SUCCESS";
    if (s == "a")
        return "NETWORK_MESSAGE_START";
    if (s == "g")
        return "NETWORK_MESSAGE_WAIT_FOR_GAMEOPTION";
    if (s == "m")
        return "NETWORK_MESSAGE_MAP_READY";
    return s;
}
exports.debugStringToMessage = debugStringToMessage;
function debugIntToMethod(i) {
    switch (i) {
        case -1: return "METHOD_DESTROY";
        case 3: return "Method_DeadOutOfBounds_Guest";
        case 4: return "Method_MakeDead_Guest";
        case 5: return "Method_CharacterManager_Sync_Guest";
        case 6: return "Method_ShowJump";
        case 8: return "Method_WeaponItem_Guest";
        case 9: return "Method_PositionCharacters";
        case 11: return "Method_RolesSwitched";
        case 12: return "Method_UIHideTimer";
        case 13: return "Method_UIUpdateTimer";
        case 14: return "Method_UIUpdateTimerRetreat";
        case 15: return "Method_InstantiateWeaponBox_Guest";
        case 16: return "Method_InstantiateHealthBox_Guest";
        case 18: return "Method_RiseLava";
        case 19: return "Method_UIUpdateInfoText";
        case 20: return "Method_UpdateRoundCount";
        case 21: return "Method_StartSuddenDeath";
        case 22: return "Method_UpdateWind";
        case 23: return "Method_SelectNextPlayerAndCharacter";
        case 24: return "Method_UIInitData";
        case 25: return "Method_ActivateCharacter";
        case 26: return "Method_DeactivateCharacter";
        case 28: return "Method_PositionPlatforms";
        case 29: return "Method_PositionDestructibleObjects";
        case 31: return "Method_Explosion";
        case 32: return "Method_Map_Sync_Guest";
        case 33: return "Method_BuildFromData";
        case 34: return "Method_BuildFirstPass";
        case 35: return "Method_BuildSecondPass";
        case 36: return "Method_PositionMine";
        case 37: return "Method_UIUpdateData";
        case 38: return "Method_Flip";
        case 39: return "Method_ExplosionInit_Common";
        case 40: return "Method_GetExplosion_Guest";
        case 41: return "Method_ActivateMine";
        case 42: return "Method_CharacterUserInterface_UpdateUI";
        case 43: return "Method_UpdateDamages";
        case 44: return "Method_FireLoadSound";
        case 45: return "Method_WeaponItemSound";
        case 46: return "Method_MortarInitStub";
        case 47: return "Method_CollectHealth_Common";
        case 49: return "Method_ShowTouchDown";
        case 50: return "Method_UpdateWeapon_Guest";
        case 51: return "Method_CameraFollowCharacter";
        case 52: return "Method_CameraFollowMine";
        case 53: return "Method_DashStamp";
        case 54: return "Method_ExplosionStamp";
        case 55: return "Method_PositionBeam";
        case 56: return "Method_Dash";
        case 57: return "Method_GameOver";
        case 60: return "Method_InitRagdoll";
        case 61: return "Method_DidEndRagdoll";
        case 62: return "Method_RoundIsReady";
        case 64: return "Method_ShowTimer";
        case 65: return "Method_FallSound";
        case 66: return "Method_GrenadeSound";
        case 68: return "Method_ShieldSFXHit";
        case 69: return "Method_FireworksInitDebris";
        case 70: return "Method_ShotgunSFX";
        case 71: return "Method_SniperSFX";
        case 72: return "Method_AmmoDestroy_Common";
        case 73: return "Method_SayNow";
        case 74: return "Method_UpdateCurrentWeapon_Guest";
        case 75: return "Method_WeaponItemBox_Guest";
        case 76: return "Method_UpdateOption";
        case 77: return "Method_RainbowStart";
        case 78: return "Method_RainbowDecrease";
        case 79: return "Method_FireworksLaunch";
        case 80: return "Method_FireworksDebris_Common";
        case 81: return "Method_FireworksExplode_Common";
        case 82: return "Method_LoadStyle";
        case 83: return "Method_PositionThrones";
        case 84: return "Method_SyncGameOption";
        case 85: return "Method_KingCaptured";
        case 86: return "Method_KingShield";
        case 87: return "Method_ShieldSFXEnd";
        default: return "‼️⁉️ (" + i + ")";
    }
}
exports.debugIntToMethod = debugIntToMethod;
function debugIntToObject(i) {
    switch (i) {
        case 1: return "NETWORK_IDENTIFIER_GAME_MANAGER";
        case 2: return "NETWORK_IDENTIFIER_MAP_CONTROLLER";
        case 3: return "NETWORK_IDENTIFIER_ROUND_CONTROLLER";
        case 4: return "NETWORK_IDENTIFIER_EXPLOSION_MANAGER";
        default: return "NetworkObject id: " + i;
    }
}
exports.debugIntToObject = debugIntToObject;
