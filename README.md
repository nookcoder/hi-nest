# How to use NestJs

## Project Structure

main.js : 
- NestJs 가 제일 먼저 읽는 파일
- Global 설정 등을 설정 

app.module.ts : 
- root module 의 역할을 해주는 것 
- app 에 대한 모든 정보가 모여있는 곳 

app.controller.ts : 
- URL 을 받아오고 Service 로직을 실행시키는 파일 

app.service.ts : 
- 비즈니스 로직을 구현하는 파일 

*.spec.ts : 
- Jest 라이브러리를 통해 Unit Test 를 할 수 있는 파일 
- test/app.e2e-spec.ts 는 End To End 테스트를 할 수 있는 파일 
- NestJS 는 Jest 를 기본적으로 셋팅해줌 

## Decorator

@IsString() , @IsNumber() : 타입 검사 
@IsOptional() : Allow Null

@Get(), @Post(), @DELETE() : HTTP Method 

@Query(), @Body(), @Params() : Request/Response 에 쓰이는 데이터 정의 

@Injectable() : Controller 에 주입 (의존성 주입을 위한 Decorator) 

@Module : 모듈임을 나타냄 , controllers 와 providers 를 정의해야함 ( *.module.ts 코드 참조) 

