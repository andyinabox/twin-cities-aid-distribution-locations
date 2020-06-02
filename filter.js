class Filter {
  $filters = []
  
  constructor(el, options) {
    Object.assign(this, options)

    this.$el = el
    this.$controls = document.getElementById('filter-controls')
    this.renderControls(this.$controls)
    this.list = new List(this.$el.id, {
      valueNames: this.sortOptions.map(o => o.name)
    })
  }

  update() {
    const sortSettings = _.find(this.sortOptions, o => (o.name === this.$sort.value))
    const filterValues = this.$filters.map(f => f.checked)

    this.list.filter(i => {
        const index = _.findIndex(this.statusOptions, o => (o.id === i.values().status))
        return filterValues[index]
      })
    this.list.sort(sortSettings.name, sortSettings.sort)
  }

  renderControls() {
    

    const options = this.sortOptions.map(o => {
      return `<option value="${o.name}" ${o.selected && 'selected'}>${o.label}</option>`
    }).join('')


    const filters = this.statusOptions.map(s => {
      return `<li><input class="filter" type="checkbox" id="filter-${s.name}" value="${s.name}" checked><label for="filter-${s.name}">${s.label}</label></li>`
    }).join('')

    this.$controls.innerHTML = `
      <label for="sort-by">Sort by: </label>
      <select name="sort-by" class="sort-by">
        ${options}
      </select>
      <ul class="filters">
        ${filters}
      </ul>
    `

    this.$sort = this.$controls.querySelector('select.sort-by')
    // // convert node list to array so we cacn use forEach
    this.$filters = Array.prototype.slice.call(this.$controls.querySelectorAll('input.filter'))
    this.$sort.addEventListener('change', this.update.bind(this))
    this.$filters.forEach($e => $e.addEventListener('change', this.update.bind(this)))

    // // sorting
    // const $sortLabel = document.createElement('label')
    // $sortLabel.for = 'sort-by'
    // $sortLabel.innerHTML = 'Sort by: '
    // this.$sort = document.createElement('select')
    // this.$sort.name = 'sort-by'
    // this.$sort.id = 'sort-by'
  
    // Object.keys(this.sortOptions).forEach(k => {
    //   const $el = document.createElement('option')
    //   $el.value = k
    //   $el.innerHTML = this.sortOptions[k].label
    //   $el.selected = !!this.sortOptions[k].selected
    //   this.$sort.append($el)
    // })
    
    // this.$sort.addEventListener('change', this.update.bind(this))
    
    // this.$controls.append($sortLabel)
    // this.$controls.append(this.$sort)

    // // filtering
    // this.statusOptions.forEach(s => {
    // })
    
  }
}