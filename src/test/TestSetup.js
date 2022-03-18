class TestResult {
    constructor(testCases) {
        this.testCases = testCases;
    }
}

class TestSetup {
    constructor(testCases) {
        this.testCases = testCases;
    }

    run() {
        let results = [];

        this.testCases.forEach((testCase) => {
            results.add(testCase.assert());
        });
        
        return results;
    }
}

export { TestSetup, TestResult }