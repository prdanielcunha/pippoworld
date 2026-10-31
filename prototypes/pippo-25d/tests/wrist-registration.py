"""Compatibility entry point: v32 replaces the isolated-wrist construction."""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('continuous-body.py')),run_name='__main__')
