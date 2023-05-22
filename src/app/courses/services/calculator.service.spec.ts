import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service"
import { LoggerService } from "./logger.service"

describe('CalculatorService', ()=> {
    let calculator: CalculatorService;
    let loggerSpy: any;

    beforeEach(()=> {
        console.log('calling before each')
        
        /* Cria uma instância fake do LoggerService, contendo um método fake "log" */
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
        //calculator = new CalculatorService(loggerSpy);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                /* LoggerService */
                {provide: 
                    LoggerService, 
                    useValue: loggerSpy}
            ]
        });

        calculator = TestBed.inject(CalculatorService);
    })
/* f focaliza todo o teste apenas nesse bloco */
    //fit('Should add two numbers', ()=> {
    it('Should add two numbers', ()=> {
        //const logger = new LoggerService();
        

        /* "Espia" o método "log" da instância de LoggerService */
        //spyOn(logger, 'log');

        console.log('add test')
        const result = calculator.add(2,2);

        expect(result).toBe(4);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
 /* x desabilita todo o bloco */
    //xit('Should subtract two numbers', ()=> {
    it('Should subtract two numbers', ()=> {
        console.log('subtract test')
        /* const calculator = new CalculatorService(new LoggerService()); */
        const result = calculator.subtract(2,2);

        expect(result).toBe(0, 'unexpected subtraction result');
    })
});
