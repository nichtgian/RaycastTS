class TestConfig {
    constructor(testSetups) {
        this.tests= testSetups;
    }

    testAll() {
        this.tests.forEach((testSetup) => {
            logResults(testSetup.run());
        });

        /*
        setTimeout(() => {
            console.clear();
        }, 120000);
        */
    }  

    logResults(testResults) {
        console.groupCollapsed();
        testResults.forEach((result) => {
            console.groupCollapsed('%c__%c' + (result.passed == false ? ' failed' : ' passed'),
            'background-color: ' + (result.passed == false ? 'red' : 'green'),
            'background-color: transparent');
            console.table({
                Result: { value: result.result },
                Expected: { value: result.test.case.expectedResult },
                TestSetup: { value: result.test.setup },
                TestCase: { value: result.test.case }
            });
            console.groupEnd();
        });
        console.groupEnd();
    }
}