#!/bin/sh

HERE=`dirname $0`
ROOT=$HERE/..

cd $ROOT

FAILURES=

################################################################################

echo Running harmony-tests/succeed...

SUCCEED_PASS=0
SUCCEED_FAIL=0

for f in harmony-tests/succeed/*.js ; do
    ./njs -H -f $f >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        SUCCEED_PASS=$(($SUCCEED_PASS + 1))
    else
        SUCCEED_FAIL=$(($SUCCEED_FAIL + 1))
        FAILURES="$FAILURES $f"
    fi
done

echo "==> $SUCCEED_PASS passed, $SUCCEED_FAIL failed."

################################################################################

echo
echo Running harmony-tests/fail-resolve...

FAIL_RESOLVE_PASS=0
FAIL_RESOLVE_FAIL=0

for f in harmony-tests/fail-resolve/*.js ; do
    ./njs -H -E "Narcissus.resolver.resolve(Narcissus.parser.parse(snarf('$f')),Narcissus.interpreter.globalStaticEnv)" >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        FAIL_RESOLVE_FAIL=$((FAIL_RESOLVE_FAIL + 1))
        FAILURES="$FAILURES $f"
    else
        FAIL_RESOLVE_PASS=$((FAIL_RESOLVE_PASS + 1))
    fi
done

echo "==> $FAIL_RESOLVE_PASS passed, $FAIL_RESOLVE_FAIL failed."

################################################################################

echo
echo Running harmony-tests/fail-execute...

FAIL_EXECUTE_PASS=0
FAIL_EXECUTE_FAIL=0

for f in harmony-tests/fail-execute ; do
    ./njs -H -f $f >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        FAIL_EXECUTE_FAIL=$(($FAIL_EXECUTE_FAIL + 1))
        FAILURES="$FAILURES $f"
    else
        FAIL_EXECUTE_PASS=$(($FAIL_EXECUTE_PASS + 1))
    fi
done

echo "==> $FAIL_EXECUTE_PASS passed, $FAIL_EXECUTE_FAIL failed."

################################################################################

echo
echo TOTAL:

TOTAL_PASS=$(($SUCCEED_PASS + $FAIL_EXECUTE_PASS + $FAIL_RESOLVE_PASS))
TOTAL_FAIL=$(($SUCCEED_FAIL + $FAIL_EXECUTE_FAIL + $FAIL_RESOLVE_FAIL))

echo "==> $TOTAL_PASS passed, $TOTAL_FAIL failed."

if [ $TOTAL_FAIL -gt 0 ]; then
    echo
    echo Failures:
    for f in $FAILURES ; do
        echo "    $f"
    done
    exit 1
else
    exit 0
fi
