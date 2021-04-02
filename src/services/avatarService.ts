type avatarServiceProps = {
  letter: string
}

export function avatarService(letter): avatarServiceProps {
  const colors = {
    a: '#1976D2',
    b: '#64B5F6',
    c: '#F44336',
    d: '#E31B0C',
    e: '#4CAF50',
    f: '#3B873E',
    g: '#FF9800',
    h: '#621b16',
    j: '#FDD835',
    k: '#323232',
    l: '#AF52DE',
    m: '#FEEFFA',
    n: '#00BCD4',
    o: '#5856D6',
    p: '#1ABC9C',
    q: '#2ECC71',
    s: '#FCFFEB',
    t: '#00ABA9',
    u: '#607D8B',
    v: '#6D8764',
    w: '#A20025',
    x: '#E3C800',
    y: '#9B9B9B',
    z: '#FF5722',
  }

  return colors[letter.toLowerCase()] ?? '#1976D2'
}
