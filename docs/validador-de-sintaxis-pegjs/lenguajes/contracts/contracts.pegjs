Start
  = contracts:contractDefinition*

contractDefinition
  = "contract" _ contractName:identifier _ "{" _ elements:contractElement* _ "}"
    { return { contractName, elements } }

contractElement
  = functionDefinition / classDefinition

functionDefinition
  = _ returnType:type _ identifier:identifier _ "(" _ parameters:parameterList? _ ")" _ ";"
  	{ return { returnType, identifier, parameters } }

classDefinition
  = _ "class" _ className:identifier _ "{" _ classElements:classElement* _ "}"
	{ return { className, classElements } }

classElement
  = propertyDefinition / functionDefinition

propertyDefinition
  = _ type:type _ propertyName:identifier _ ";"
    { return { type, propertyName } }

parameterList
  = _ first:parameter _ rest:("," _ parameter)*
  	{ return [first].concat(rest.map(r => r[2])); }

parameter
  = _ type:type _ identifier:identifier
	{ return { type, identifier } }
    
type
  = "float" / "integer" / "string" / "boolean" / "array" / "object" / "function" / "class" / identifier

identifier
  = [a-zA-Z_] [a-zA-Z0-9_]*
	{ return text() }
    
_ "whitespace"
  = [ \t\n\r]* { return null; }