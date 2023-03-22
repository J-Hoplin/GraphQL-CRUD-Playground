import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',

  // 내부적인 표현을 외부적인 표현으로 바꾸는것
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw new Error('GraphQL Date Scalar serializer expect instance of Date')
  },

  /**
   * parseValue, parseLiteral : 외부적인 표현을 내부적인 표현으로 변경
   */

  // Query Variable에 선언된것을 value라고 함. $input parameter 사용하는 경우이다.
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value)
    }
    throw new Error('GraphQL Date Scalar Parser expect a \'number\'')
  },

  // 직접 literal 형태로 기재한 값을 의미한다. $input 타입을 쓰지 않고 literal 형태로 기재하는 경우이다.
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null;
  }

})