Call(
{
  methodA: function()
  {
    this.id = this.createUUID();
  },

  valueOf: function()
  {
    return this.id;
  },

  toString: function()
  {
      return this.id;
  }
});