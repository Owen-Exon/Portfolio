for /D /r %g in (*) do for %f in (%g\*.png) do (ffmpeg -i "%f" "%g\%~nf.jpg"
del %f
)