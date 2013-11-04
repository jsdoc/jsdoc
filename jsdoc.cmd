@ECHO OFF

SETLOCAL

REM jsdoc.js expects Unix-style paths without a trailing slash
SET _BASEPATH=%~dp0
SET _BASEPATH=%_BASEPATH:\=/%
SET _BASEPATH=%_BASEPATH:~0,-1%

REM for whatever reason, Rhino requires module paths to be valid URIs
SET _URLPATH=file:/%_BASEPATH%

REM we need the ability to resolve paths relative to the user's pwd
SET PWD=%cd%

IF "%_URLPATH%"=="%_URLPATH: =%" GOTO NO_SPACES
:ESCAPE_SPACE
SET _TRAILING=%_URLPATH:* =%
CALL SET _URLPATH=%%_URLPATH: %_TRAILING%=%%
SET _URLPATH=%_URLPATH%%%20%_TRAILING%
IF NOT "%_URLPATH%"=="%_URLPATH: =%" GOTO ESCAPE_SPACE
:NO_SPACES

IF [%1]==[--debug] (
    ECHO Running Debug
    SET CMD=org.mozilla.javascript.tools.debugger.Main -debug -opt -1

    REM `SHIFT` doesn't affect %*
    :COLLECT_ARGS
    IF [%2]==[] GOTO LAST_ARG
    SET ARGS=%ARGS% %2
    SHIFT
    GOTO COLLECT_ARGS
) ELSE (
    SET CMD=org.mozilla.javascript.tools.shell.Main
    SET ARGS=%*
)
:LAST_ARG

IF [%1]==[-T] (
    ECHO Running Tests
    java -classpath "%_BASEPATH%/rhino/js.jar" %CMD% -opt -1 -modules "%_URLPATH%/node_modules" -modules "%_URLPATH%/rhino" -modules "%_URLPATH%/lib" -modules "%_URLPATH%" "%_BASEPATH%/jsdoc.js" %ARGS% --nocolor --dirname="%_BASEPATH%/
) ELSE (
    REM normal mode should be quiet
    java -classpath "%_BASEPATH%/rhino/js.jar" %CMD% -modules "%_URLPATH%/node_modules" -modules "%_URLPATH%/rhino" -modules "%_URLPATH%/lib" -modules "%_URLPATH%" "%_BASEPATH%/jsdoc.js" %ARGS% --dirname="%_BASEPATH%/
)

ENDLOCAL
