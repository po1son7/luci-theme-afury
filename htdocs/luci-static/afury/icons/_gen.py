from pathlib import Path

OUT = Path(__file__).resolve().parent
NS = 'xmlns="http://www.w3.org/2000/svg"'
HEAD = f'<svg {NS} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
SLASH = '<path d="M5 19 19 5"/>'


def write(name: str, body: str, disabled: bool = False) -> None:
    inner = f'<g opacity=".42">{body}</g>{SLASH}' if disabled else body
    (OUT / name).write_text(HEAD + inner + "</svg>\n", encoding="utf-8")


ETH = '<rect x="4.5" y="5.5" width="15" height="9" rx="1.6"/><path d="M8 14.5v2.2M16 14.5v2.2M7.2 18.5h9.6"/>'
BRIDGE = '<rect x="2.5" y="5.5" width="7.5" height="6" rx="1.2"/><rect x="14" y="5.5" width="7.5" height="6" rx="1.2"/><path d="M10 8.5h4M6.2 11.5v3.2h11.6v-3.2"/>'
WIFI = '<path d="M4.6 9.6a10 10 0 0 1 14.8 0"/><path d="M7.6 12.8a6 6 0 0 1 8.8 0"/><path d="M10.4 16a2.4 2.4 0 0 1 3.2 0"/><circle cx="12" cy="19.1" r="0.85" fill="#111111" stroke="none"/>'
SWITCH = '<rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="8" cy="12" r="1.25"/><circle cx="12" cy="12" r="1.25"/><circle cx="16" cy="12" r="1.25"/>'
TUNNEL = '<circle cx="7" cy="12" r="3.1"/><circle cx="17" cy="12" r="3.1"/><path d="M10.1 12h3.8"/>'
VLAN = '<path d="M4 7.5h9.2L18.5 12 13.2 16.5H4z"/><circle cx="8.2" cy="12" r="1.05" fill="#111111" stroke="none"/>'
VRF = '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 8v8M8 6h3.4c3.6 0 6.6 2.4 6.6 6"/>'
WG = '<path d="M12 3.8 5.2 6.6v5c0 4.4 2.9 7.4 6.8 8.6 3.9-1.2 6.8-4.2 6.8-8.6v-5z"/>'
ALIAS = '<rect x="3.8" y="5.8" width="11.2" height="11.2" rx="2"/><rect x="9" y="7" width="11.2" height="11.2" rx="2"/>'
BOLT = '<path d="M13.2 3.6 8.1 12h3.7l-1 8.4 6.2-10.2h-3.8z"/>'
LOAD = '<path d="M12 4.2a7.8 7.8 0 1 1-7.4 5.4"/>'


def bars(n: int) -> str:
    bits = []
    for i, h in enumerate((5.5, 8.5, 11.5, 14.5)):
        x = 5 + i * 4
        y = 19.5 - h
        if i < n:
            bits.append(f'<rect x="{x}" y="{y}" width="2.4" height="{h}" rx="0.6" fill="#111111" stroke="none"/>')
        else:
            bits.append(f'<rect x="{x}" y="{y}" width="2.4" height="{h}" rx="0.6"/>')
    return "".join(bits)


write("ethernet.svg", ETH)
write("ethernet_disabled.svg", ETH, True)
write("bridge.svg", BRIDGE)
write("bridge_disabled.svg", BRIDGE, True)
write("wifi.svg", WIFI)
write("wifi_disabled.svg", WIFI, True)
write("switch.svg", SWITCH)
write("switch_disabled.svg", SWITCH, True)
write("tunnel.svg", TUNNEL)
write("tunnel_disabled.svg", TUNNEL, True)
write("vlan.svg", VLAN)
write("vlan_disabled.svg", VLAN, True)
write("vrf.svg", VRF)
write("vrf_disabled.svg", VRF, True)
write("wireguard.svg", WG)
write("wireguard_disabled.svg", WG, True)
write("alias.svg", ALIAS)
write("alias_disabled.svg", ALIAS, True)
write("port_up.svg", ETH)
write("port_down.svg", ETH, True)
write("port_pse_up.svg", ETH + BOLT)
write("port_pse_down.svg", ETH + BOLT, True)
write("loading.svg", LOAD)
write("signal-none.svg", bars(0) + SLASH)
write("signal-000-000.svg", bars(0))
write("signal-000-025.svg", bars(1))
write("signal-025-050.svg", bars(2))
write("signal-050-075.svg", bars(3))
write("signal-075-100.svg", bars(4))

print("wrote", len(list(OUT.glob("*.svg"))), "icons")
