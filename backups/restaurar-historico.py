from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent
name='pippo-25d-historico-2026-10-28.bundle'
parts=[root/(name+'.part01'),root/(name+'.part02')]
data=b''.join(p.read_bytes() for p in parts)
expected='cc985481463017396c35d988470e21e5ab363576041115eea2739fdb5eae13c4'
if hashlib.sha256(data).hexdigest()!=expected:raise SystemExit('Falha de integridade: nao criar o bundle.')
target=root/name
if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest()!=expected:raise SystemExit('Arquivo de destino ja existe e difere. Preserve-o antes de continuar.')
target.write_bytes(data)
print('Historico reconstruido e SHA-256 conferido:',target)
print('git clone '+str(target)+' pippo-restaurado')
