import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Annotator } from '@annotorious/react';
import { AnnotoriousManifoldContext } from '../AnnotoriousManifold';
import { createPluginManifold, PluginManifoldProxy } from './PluginManifoldInstance';

interface PluginManifoldData {

  mountFn: (anno: Annotator, opts?: any) => unknown;

  opts?: any;

}

interface PluginProviderContextValue {

  setPlugins: React.Dispatch<React.SetStateAction<Map<string, PluginManifoldData>>>

  manifolds: Map<string, unknown>;

}

// @ts-ignore
export const PluginProviderContext = createContext<PluginProviderContextValue>(undefined); 

interface PluginProviderProps {

  children: ReactNode;

}

export const PluginProvider = (props: PluginProviderProps) => {

  const context = useContext(AnnotoriousManifoldContext);

  const annotators = useMemo(() => (
    Array.from(context.annotators.values())
  ), [Array.from(context.annotators.keys()).join(':')]);

  // Registered plugins (by plugin name)
  const [plugins, setPlugins] = useState<Map<string, PluginManifoldData>>(new Map());

  // One manifold per plugin (each managing one plugin instance per annotator)
  const [manifolds, setManifolds] = useState<Map<string, any>>();

  useEffect(() => {
    const manifoldInstances = Array.from(plugins.entries()).map(([name, { mountFn, opts }]) => {
      return [name, createPluginManifold(annotators, mountFn, opts)];
    }) as [string, any][];

    setManifolds(new Map(manifoldInstances));

    return () => {
      manifoldInstances.forEach(([_, instance]) => instance.destroy && instance.destroy());
    }
  }, [annotators, plugins]);

  return (
    <PluginProviderContext.Provider value={{ setPlugins, manifolds }}>
      {props.children}
    </PluginProviderContext.Provider>
  )

}

export const usePluginManifold = <P extends unknown>(name: string) => {
  const { manifolds } = useContext(PluginProviderContext);
  return manifolds.get(name) as PluginManifoldProxy<P>;
}