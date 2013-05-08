// Test for inherited constructor parameters

/**
 *
 * @param {object} config Configuration object
 * @param {string} config.fill Fill color
 * @constructor
 */
function Shape(config)
{

}

/**
 *
 * @param {object} config Configuration object
 * @param {number} config.radius Circle radius
 * @inheritparams config.
 * @constructor
 * @augments Shape
 */
function Circle(config)
{

}

/**
 * This shape takes a background image URL instead of a color identifier
 *
 * @param {object} config Configuration object
 * @param {string} config.fill Background image URL
 * @inheritparams config.
 * @augments Shape
 * @constructor
 */
function BackgroundShape(config)
{

}

/**
 * @augments Shape
 * @inheritparams config
 * @constructor
 */
function PlaceholderShape(config)
{

}

/**
 * @constructor
 */
function NoParams()
{

}

/**
 * @augments NoParams
 * @inheritparams config.
 * @param config
 * @constructor
 */
function InheritsNoParams(config)
{

}
