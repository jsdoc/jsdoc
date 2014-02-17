@ECHO OFF

SETLOCAL

REM jsdoc.js expects paths without a trailing slash
SET _BASEPATH=%~dp0
SET _BASEPATH=%_BASEPATH:~0,-1%

REM we need the ability to resolve paths relative to the user's working
REM directory prior to launching JSDoc
SET PWD=%cd%

IF [%1]==[--debug] (
    SET CMD=org.mozilla.javascript.tools.debugger.Main -debug -opt -1
) ELSE (
    SET CMD=org.mozilla.javascript.tools.shell.Main
)
SET ARGS=%*

IF [%1]==[-T] (
    java -classpath "%_BASEPATH%/rhino/js.jar" %CMD% -opt -1 -modules "%_BASEPATH%/lib" -modules "%_BASEPATH%/node_modules" -modules "%_BASEPATH%/rhino" -modules "%_BASEPATH%" "%_BASEPATH%/jsdoc.js" %ARGS% --nocolor
) ELSE (
    java -classpath "%_BASEPATH%/rhino/js.jar" %CMD% -modules "%_BASEPATH%/lib" -modules "%_BASEPATH%/node_modules" -modules "%_BASEPATH%/rhino" -modules "%_BASEPATH%" "%_BASEPATH%/jsdoc.js" %ARGS%
)

ENDLOCAL
